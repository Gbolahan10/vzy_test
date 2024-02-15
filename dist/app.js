"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const server_1 = tslib_1.__importDefault(require("./server"));
const auth_route_1 = tslib_1.__importDefault(require("./src/routes/auth.route"));
const users_route_1 = tslib_1.__importDefault(require("./src/routes/users.route"));
const index_route_1 = tslib_1.__importDefault(require("./src/routes/index.route"));
const validateEnv_1 = tslib_1.__importDefault(require("./src/utils/helpers/validateEnv"));
const payment_route_1 = tslib_1.__importDefault(require("./src/routes/payment.route"));
(0, validateEnv_1.default)();
const app = new server_1.default([
    new index_route_1.default(),
    new auth_route_1.default(),
    new users_route_1.default(),
    new payment_route_1.default(),
]);
app.listen();
exports.default = app;
//# sourceMappingURL=app.js.map