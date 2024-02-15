import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import { HttpException } from '../exceptions/HttpException';
import DatabaseService from '../services/database.service';
import User from '../models/users.model';
import Transaction from '../models/transactions.model';
import Stripe from 'stripe';
import { ENDPOINT_SECRET, WEBHOOK_API_KEY } from '../config/index';


class PaymentsController {
    public userService = new DatabaseService(User);
    public transactionService = new DatabaseService(Transaction);
    private stripe = new Stripe(WEBHOOK_API_KEY);
    private endpointSecret = ENDPOINT_SECRET;

    public generatePaymentLink = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { status } = req.user;
            if ( status === "PAID") {
                throw new HttpException(400, "You currently have an active subscription")
            }

            const product = await this.stripe.products.create({
                name: 'Monthly Subscription',
              });

            const price = await this.stripe.prices.create({
                currency: 'usd',
                unit_amount: 500,
                product: product.id,
              });

            const paymentLink = await this.stripe.paymentLinks.create({
            line_items: [
                {
                price: price.id,
                quantity: 1,
                },
            ],
            custom_fields: [
                {
                  key: 'vzy_email',
                  label: {
                    type: 'custom',
                    custom: 'Re-confirm VZY Account Email',
                  },
                  type: 'text',
                },
              ],
            });
            
            res.status(200).json({ data: { paymentLink: paymentLink.url }, message: 'Paymrnt link generated successfully' });

        } catch (error) {
            next(error);
            }
    }
    
    public fulfillPayment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sig = req.headers['stripe-signature'];
            let event

            try {
                event = this.stripe.webhooks.constructEvent(req.rawBody, sig, this.endpointSecret);
            } catch (err) {
                console.log(err)
                res.status(400).send(`Webhook Error: ${err.message}`);
                return;
            }

            // Handle the event
            switch (event.type) {
                case 'checkout.session.completed':
                    let transaction = {};
                    const email = event.data.object.custom_fields[0].text.value
                    const findUserResponse = await this.userService.find({ email });
                    if (findUserResponse.status && findUserResponse.result) {
                        await this.userService.update({email: email}, {status: "PAID"})
                        transaction['user_id'] = findUserResponse.result._id
                        transaction['transaction_data'] = event
                    } else {
                        transaction['user_id'] = "undefined"
                    }

                    await this.transactionService.create(transaction)

                    //Deactivate link to enforce just one-time use
                    await this.stripe.paymentLinks.update(
                        event.data.object.payment_link,
                        {
                          active: false
                        }
                      );
                    break;
                default:
                    break
            }
            res.send();
        } catch (error) {
          next(error);
        }
      };
}

export default PaymentsController;