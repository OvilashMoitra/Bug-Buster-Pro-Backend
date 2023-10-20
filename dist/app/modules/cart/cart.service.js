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
exports.CartService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cart = yield app_1.prisma.cart.create({
        data: payload,
        include: {
            auth: true,
            product: true,
        },
    });
    console.log({ cart });
    return cart;
});
const deleteCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cartToDelete = yield app_1.prisma.cart.delete({
        where: {
            id: id,
        },
    });
    return cartToDelete;
});
const updateCart = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cartToUpdate = yield app_1.prisma.cart.update({
        data: payload,
        where: {
            id: id,
        },
        include: {
            auth: true,
            product: true,
        },
    });
    if (!cartToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No cart found');
    }
    return cartToUpdate;
});
const getAllCarts = () => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield app_1.prisma.cart.findMany({
        include: {
            auth: true,
            product: true,
        },
    });
    return carts;
});
const getUserCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const carts = yield app_1.prisma.cart.findMany({
        where: {
            userId: id
        },
        include: {
            product: true,
            auth: true
        }
    });
    return carts;
});
exports.CartService = {
    createCart,
    deleteCart,
    updateCart,
    getAllCarts,
    getUserCart
};
