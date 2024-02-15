"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = require("jsonwebtoken");
const HttpException_1 = require("../exceptions/HttpException");
const date_fns_1 = require("date-fns");
const database_service_1 = tslib_1.__importDefault(require("./database.service"));
const bcrypt_1 = require("bcrypt");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
class AuthService {
    constructor() {
        this.userService = new database_service_1.default(users_model_1.default);
    }
    createToken(user_id, secretKey, expire_in) {
        const dataStoredInToken = { id: user_id };
        const createdAt = new Date(Date.now());
        const expiresIn = expire_in * 60;
        const expiresAt = (0, date_fns_1.addMinutes)(createdAt, expire_in);
        return { createdAt, expiresAt, expiresIn, token: (0, jsonwebtoken_1.sign)(dataStoredInToken, secretKey, { expiresIn }) };
    }
    async verifyToken(token, secretKey) {
        try {
            if (secretKey) {
                const verificationResponse = (await (0, jsonwebtoken_1.verify)(token, secretKey));
                const userId = verificationResponse.id;
                const findUserResponse = await this.userService.find({ _id: userId });
                return findUserResponse.result;
            }
            else {
                throw new HttpException_1.HttpException(404, 'Authentication token missing');
            }
        }
        catch (error) {
            new HttpException_1.HttpException(401, 'wrong authentication token');
        }
    }
    async generatePassword(key) {
        const passwordHash = await (0, bcrypt_1.hash)(key, 10);
        return { passwordHash, key };
    }
    async verifyPassword(key, password) {
        return await (0, bcrypt_1.compare)(password, key);
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth.service.js.map