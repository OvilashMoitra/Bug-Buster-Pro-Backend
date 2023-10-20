"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const emailSender_1 = require("../../../helpers/email/emailSender");
const jwt_1 = require("../../../helpers/jwt/jwt");
const sendResponse_1 = require("../../../shared/sendResponse");
const emailTemplate_1 = require("../../emailTemplate/emailTemplate");
const auth_service_1 = require("./auth.service");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = yield auth_service_1.AuthService.signup(userInfo);
        console.log({ user });
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error user signup');
        }
        // jwt token
        const payload = {
            _id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = yield jwt_1.jwtHelperFunction.generateJWTToken(payload, config_1.default.jwt.expires_in, config_1.default.jwt.secret);
        const refreshToken = yield jwt_1.jwtHelperFunction.generateJWTToken(payload, config_1.default.jwt.refresh_expires_in, config_1.default.jwt.refresh_secret);
        // cookie setting to user browser
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        // res.cookie('refreshToken', refreshToken);
        const modifiedResponse = { accessToken, user };
        (0, sendResponse_1.sendResponse)(res, 'User logged in successfully ', modifiedResponse);
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = yield auth_service_1.AuthService.login(userInfo);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error user signup');
        }
        // jwt token
        const payload = {
            _id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = yield jwt_1.jwtHelperFunction.generateJWTToken(payload, config_1.default.jwt.expires_in, config_1.default.jwt.secret);
        const refreshToken = yield jwt_1.jwtHelperFunction.generateJWTToken(payload, config_1.default.jwt.refresh_expires_in, config_1.default.jwt.refresh_secret);
        // cookie setting to user browser
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        // res.cookie('refreshToken', refreshToken);
        const modifiedResponse = { accessToken, user };
        (0, sendResponse_1.sendResponse)(res, 'User logged in successfully ', modifiedResponse);
    }
    catch (error) {
        next(error);
    }
});
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    try {
        const user = yield auth_service_1.AuthService.makeResetPassword(userInfo);
        (0, sendResponse_1.sendResponse)(res, 'Password changed successfully', user);
    }
    catch (error) {
        next(error);
    }
});
const initiateResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.body;
        const user = yield auth_service_1.AuthService.initiateResetPassword(userEmail);
        // jwt token to reset password
        const jwtData = {
            _id: user.id,
            email: user.email,
            role: user.role
        };
        const resetPasswordToken = yield jwt_1.jwtHelperFunction.generateJWTToken(jwtData, config_1.default.resetPassword_token_expiresIn, config_1.default.resetPassword_token_secret);
        const emailBody = (0, emailTemplate_1.resetPasswordTemplate)(resetPasswordToken);
        if (user) {
            yield (0, emailSender_1.sendEmail)(user.email, 'Password Reset', emailBody);
        }
        (0, sendResponse_1.sendResponse)(res, 'An email have sent to your email', user);
    }
    catch (error) {
        next(error);
    }
});
const makeResetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const token = req.params.token;
        // token validation
        const jwtPayload = yield jwt_1.jwtHelperFunction.decodeJWTToken(token, config_1.default.resetPassword_token_secret);
        if (!jwtPayload) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Reset token is invalid');
        }
        const user = yield auth_service_1.AuthService.makeResetPassword(userInfo);
        (0, sendResponse_1.sendResponse)(res, 'Password have changed successfully', user);
    }
    catch (error) {
        next(error);
    }
});
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield auth_service_1.AuthService.getUser(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error user fetching');
        }
        (0, sendResponse_1.sendResponse)(res, 'User fetched successfully ', user);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userInfo = req.body;
        const user = yield auth_service_1.AuthService.updateUser(userInfo, userId);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error user updating');
        }
        (0, sendResponse_1.sendResponse)(res, 'User updated successfully ', user);
    }
    catch (error) {
        next(error);
    }
});
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const userId = req.params.id;
        // const userInfo=req.body
        const users = yield auth_service_1.AuthService.getAllUser();
        if (!users) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error user fetching');
        }
        (0, sendResponse_1.sendResponse)(res, 'User fetched successfully ', users);
    }
    catch (error) {
        next(error);
    }
});
exports.AuthController = {
    signup,
    login,
    changePassword,
    initiateResetPassword,
    makeResetPassword,
    getUser,
    updateUser,
    getAllUser
};
