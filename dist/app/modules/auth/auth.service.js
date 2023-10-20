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
exports.AuthService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const passwordHelper_1 = require("../../../helpers/passwordHelper");
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // !create user and update stats
    const signupTransaction = yield app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        if (payload.password) {
            payload.password = yield passwordHelper_1.passwordHelpers.hashPassword(payload.password);
        }
        const user = yield tx.auth.create({
            data: payload
        });
        const userWithOutPassword = passwordHelper_1.passwordHelpers.exclude(user, 'password');
        yield tx.websiteStats.update({
            data: {
                users: {
                    increment: 1
                }
            },
            where: {
                id: config_1.default.stats_id
            }
        });
        yield tx.user.create({
            data: { authId: user.id }
        });
        return userWithOutPassword;
    }));
    return signupTransaction;
    // await prisma.$transaction([user, updateStats]) // Operations succeed or fail together
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = yield app_1.prisma.auth.findUnique({
            where: {
                email: payload.email
            },
            include: {
                Role: true
            }
        });
        if (!userInfo) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        const isMatch = yield passwordHelper_1.passwordHelpers.compareHashPassword(payload.password, userInfo.password);
        if (!isMatch) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Password does not match');
        }
        const userWithOutPassword = passwordHelper_1.passwordHelpers.exclude(userInfo, 'password');
        return userWithOutPassword;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error during login');
    }
});
const initiateResetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.auth.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'User do not exist');
    }
    return user;
});
const makeResetPassword = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.auth.findUnique({
        where: {
            email: payload.email
        }
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No user found');
    }
    const isMatched = yield passwordHelper_1.passwordHelpers.compareHashPassword(payload.password, user.password);
    if (isMatched) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Old password and new password can not be the same');
    }
    const hashedPassword = yield passwordHelper_1.passwordHelpers.hashPassword(payload.password);
    const updatedUser = yield app_1.prisma.auth.update({
        data: {
            password: hashedPassword
        },
        where: {
            email: payload.email
        }
    });
    const userWithOutPassword = passwordHelper_1.passwordHelpers.exclude(updatedUser, 'password');
    return userWithOutPassword;
});
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.auth.findUnique({
        where: {
            id: id
        },
        include: {
            Role: true
        }
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No user found');
    }
    const userWithOutPassword = passwordHelper_1.passwordHelpers.exclude(user, 'password');
    return userWithOutPassword;
});
const updateUser = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("from the auth service", { payload, id });
    const user = yield app_1.prisma.auth.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            Role: true
        }
    });
    if (!user) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No user found');
    }
    const userWithOutPassword = passwordHelper_1.passwordHelpers.exclude(user, 'password');
    return userWithOutPassword;
});
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_1.prisma.auth.findMany({
        include: {
            Role: true
        }
    });
    if (!users) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No user found');
    }
    users.forEach(elem => passwordHelper_1.passwordHelpers.exclude(elem, 'password'));
    return users;
});
exports.AuthService = {
    signup,
    login,
    initiateResetPassword,
    makeResetPassword,
    getUser,
    getAllUser,
    updateUser
};
