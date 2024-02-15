"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const auth_service_1 = tslib_1.__importDefault(require("../services/auth.service"));
const HttpException_1 = require("../exceptions/HttpException");
const index_1 = require("../config/index");
const users_model_1 = tslib_1.__importDefault(require("../models/users.model"));
const database_service_1 = tslib_1.__importDefault(require("../services/database.service"));
class AuthController {
    constructor() {
        this.authService = new auth_service_1.default();
        this.userService = new database_service_1.default(users_model_1.default);
        /**
         * * Initial registration to onboard new user and store:
        */
        this.signUp = async (req, res, next) => {
            try {
                const { firstName, lastName, email, password, countryCode, phoneNumber } = req.body;
                const findUserResponse = await this.userService.find({ email });
                if (!findUserResponse.status && !findUserResponse.result) {
                    const { passwordHash } = await this.authService.generatePassword(password);
                    const data = {
                        email: email,
                        password: passwordHash,
                        firstName: firstName,
                        lastName: lastName,
                        countryCode: countryCode,
                        phoneNumber: phoneNumber,
                    };
                    const createUserResponse = await this.userService.create(data);
                    if (!createUserResponse.status)
                        throw new HttpException_1.HttpException(409, createUserResponse.error);
                    const user = createUserResponse.result;
                    res.status(201).json({ data: { user }, message: 'Account created successfully.' });
                }
                else {
                    throw new HttpException_1.HttpException(409, 'Account already exists');
                }
            }
            catch (error) {
                next(error);
            }
        };
        this.signIn = async (req, res, next) => {
            try {
                const { email, password } = req.body;
                const findUserResponse = await this.userService.find({ email });
                const token_lifetime_minutes = 1;
                if (findUserResponse.status && findUserResponse.result) {
                    const user = findUserResponse.result;
                    const passwordMatch = await this.authService.verifyPassword(user.password, password);
                    if (!passwordMatch) {
                        throw new HttpException_1.HttpException(401, 'Password Incorrect');
                    }
                    const { createdAt, expiresAt, expiresIn, token } = await this.authService.createToken(findUserResponse.result, index_1.SECRET_KEY, token_lifetime_minutes);
                    res.status(200).json({ data: { user, token_details: { token, createdAt, expiresAt, expiresIn } }, message: 'Login successful' });
                }
                else {
                    throw new HttpException_1.HttpException(400, 'Incorrect Email/Password combination');
                }
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map