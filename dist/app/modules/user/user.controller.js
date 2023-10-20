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
exports.UserController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const user_service_1 = require("./user.service");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInfo = req.body;
        const user = yield user_service_1.UserService.createUser(userInfo);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating user');
        }
        (0, sendResponse_1.sendResponse)(res, 'User created successfully', user);
    }
    catch (error) {
        next(error);
    }
});
// const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.id;
//         const deletedUser = await UserService.deleteUser(userId);
//         if (!deletedUser) {
//             throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting user');
//         }
//         sendResponse(res, 'User deleted successfully', deletedUser);
//     } catch (error) {
//         next(error);
//     }
// };
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.UserService.getAllUsers();
        if (!users) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching users');
        }
        (0, sendResponse_1.sendResponse)(res, 'Users fetched successfully', users);
    }
    catch (error) {
        next(error);
    }
});
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield user_service_1.UserService.getUserById(userId);
        if (!user) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
        }
        (0, sendResponse_1.sendResponse)(res, 'User fetched successfully', user);
    }
    catch (error) {
        next(error);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const userInfoToUpdate = req.body;
        const updatedUser = yield user_service_1.UserService.updateUser(userInfoToUpdate, userId);
        if (!updatedUser) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating user');
        }
        (0, sendResponse_1.sendResponse)(res, 'User updated successfully', updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    createUser,
    // deleteUser,
    getAllUsers,
    getUserById,
    updateUser
};
