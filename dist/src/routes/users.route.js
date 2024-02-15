"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = tslib_1.__importDefault(require("../middlewares/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middlewares/validation.middleware"));
const users_controller_1 = tslib_1.__importDefault(require("../controllers/users.controller"));
const users_dtos_1 = require("../dtos/users.dtos");
class UsersRoute {
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.usersController = new users_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/update`, (0, validation_middleware_1.default)(users_dtos_1.UpdateUserDto, 'body'), auth_middleware_1.default, this.usersController.updateUser);
        this.router.get(`${this.path}/subscription/end`, auth_middleware_1.default, this.usersController.manuallyEndSubscription);
    }
}
exports.default = UsersRoute;
//# sourceMappingURL=users.route.js.map