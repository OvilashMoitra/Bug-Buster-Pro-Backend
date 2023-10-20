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
exports.UserService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const authExist = yield app_1.prisma.auth.findUnique({
        where: {
            id: payload.authId
        }
    });
    if (!authExist) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'You must sign up first');
    }
    const user = yield app_1.prisma.user.create({
        data: payload,
    });
    return user;
});
// const deleteUser = async (userId: string): Promise<User> => {
//     const userToDelete = await prisma.user.delete({
//         where: {
//             id: userId,
//         },
//     });
//     return userToDelete;
// };
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield app_1.prisma.user.findMany({
        include: {
            auth: true,
        }
    });
    return users;
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prisma.user.findMany({
        where: {
            authId: userId,
        },
        include: {
            auth: {
                select: {
                    email: true,
                    id: true
                }
            }
        }
    });
    console.log(user);
    return user[0];
});
const updateUser = (payload, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    console.log(userId);
    const existingUser = yield app_1.prisma.auth.findUnique({
        where: {
            id: userId,
        },
    });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    // Update the properties of the existing user based on the payload
    const updatedUser = yield app_1.prisma.user.updateMany({
        where: {
            authId: userId
        },
        data: payload,
    });
    console.log("updated user", updatedUser);
    return updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser[0];
});
exports.UserService = {
    createUser,
    // deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
};
