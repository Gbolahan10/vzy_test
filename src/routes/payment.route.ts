import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface';
import PaymentsController from '../controllers/payment.controller';
import authMiddleware from '../middlewares/auth.middleware';

class PaymentsRoute implements Routes {
  public path = '/payment';
  public router = Router();
  public paymentsController = new PaymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/webhook`, this.paymentsController.fulfillPayment);
    this.router.get(`${this.path}/link/generate`, authMiddleware, this.paymentsController.generatePaymentLink);
    }
}

export default PaymentsRoute;
