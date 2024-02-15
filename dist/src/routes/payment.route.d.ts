import { Routes } from '../interfaces/routes.interface';
import PaymentsController from '../controllers/payment.controller';
declare class PaymentsRoute implements Routes {
    path: string;
    router: import("express-serve-static-core").Router;
    paymentsController: PaymentsController;
    constructor();
    private initializeRoutes;
}
export default PaymentsRoute;
