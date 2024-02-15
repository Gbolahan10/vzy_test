import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../interfaces/auth.interface';
import DatabaseService from '../services/database.service';
declare class PaymentsController {
    userService: DatabaseService;
    transactionService: DatabaseService;
    private stripe;
    private endpointSecret;
    generatePaymentLink: (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>;
    fulfillPayment: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default PaymentsController;
