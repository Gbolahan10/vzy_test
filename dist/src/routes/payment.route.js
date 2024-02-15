"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const payment_controller_1 = tslib_1.__importDefault(require("../controllers/payment.controller"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
class PaymentsRoute {
    constructor() {
        this.path = '/payment';
        this.router = (0, express_1.Router)();
        this.paymentsController = new payment_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/webhook`, this.paymentsController.fulfillPayment);
        this.router.get(`${this.path}/link/generate`, auth_middleware_1.default, this.paymentsController.generatePaymentLink);
    }
}
exports.default = PaymentsRoute;
//# sourceMappingURL=payment.route.js.map