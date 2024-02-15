"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = require("../exceptions/HttpException");
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
class UsersController {
    constructor() {
        this.userService = new database_service_1.default(users_model_1.default);
        this.updateUser = async (req, res, next) => {
            try {
                const { _id } = req.user;
                const userData = req.body;
                await this.userService.update({ _id: _id }, userData);
                res.status(200).json({ message: 'User details updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.manuallyEndSubscription = async (req, res, next) => {
            try {
                const { status, _id } = req.user;
                if (status === "EXPIRED") {
                    throw new HttpException_1.HttpException(400, "You currently don't have an active subscription");
                }
                await this.userService.update({ _id: _id }, { status: "EXPIRED" });
                res.status(200).json({ message: 'Subscription ended successfully' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = UsersController;
//# sourceMappingURL=users.controller.js.map