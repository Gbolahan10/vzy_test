"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const transactions_model_1 = tslib_1.__importDefault(require("../models/transactions.model"));
const stripe_1 = tslib_1.__importDefault(require("stripe"));
const index_1 = require("../config/index");
class PaymentsController {
    constructor() {
        this.userService = new database_service_1.default(users_model_1.default);
        this.transactionService = new database_service_1.default(transactions_model_1.default);
        this.stripe = new stripe_1.default(index_1.WEBHOOK_API_KEY);
        this.endpointSecret = index_1.ENDPOINT_SECRET;
        this.generatePaymentLink = async (req, res, next) => {
            try {
                const { status } = req.user;
                if (status === "PAID") {
                    throw new HttpException_1.HttpException(400, "You currently have an active subscription");
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
            }
            catch (error) {
                next(error);
            }
        };
        this.fulfillPayment = async (req, res, next) => {
            try {
                const sig = req.headers['stripe-signature'];
                let event;
                try {
                    event = this.stripe.webhooks.constructEvent(req.rawBody, sig, this.endpointSecret);
                }
                catch (err) {
                    console.log(err);
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }
                // Handle the event
                switch (event.type) {
                    case 'checkout.session.completed':
                        console.log("case checkout");
                        let transaction = {};
                        const email = event.data.object.custom_fields[0].text.value;
                        const findUserResponse = await this.userService.find({ email });
                        if (findUserResponse.status && findUserResponse.result) {
                            await this.userService.update({ email: email }, { status: "PAID" });
                            transaction['user_id'] = findUserResponse.result._id;
                            transaction['transaction_data'] = event;
                        }
                        else {
                            transaction['user_id'] = "undefined";
                        }
                        await this.transactionService.create(transaction);
                        //Deactivate link to enforce just one-time use
                        await this.stripe.paymentLinks.update(event.data.object.payment_link, {
                            active: false
                        });
                        break;
                    default:
                        break;
                }
                res.send();
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = PaymentsController;
//# sourceMappingURL=payment.controller.js.map