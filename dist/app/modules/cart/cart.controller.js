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
exports.CartController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const cart_service_1 = require("./cart.service");
const createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartInfo = req.body;
        const cart = yield cart_service_1.CartService.createCart(cartInfo);
        if (!cart) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating cart');
        }
        (0, sendResponse_1.sendResponse)(res, 'Cart created successfully', cart);
    }
    catch (error) {
        next(error);
    }
});
const deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.id;
        const cartToDelete = yield cart_service_1.CartService.deleteCart(cartId);
        if (!cartToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting cart');
        }
        (0, sendResponse_1.sendResponse)(res, 'Cart deleted successfully', cartToDelete);
    }
    catch (error) {
        next(error);
    }
});
const updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.id;
        const cartInfo = req.body;
        const cartToUpdate = yield cart_service_1.CartService.updateCart(cartId, cartInfo);
        if (!cartToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating cart');
        }
        (0, sendResponse_1.sendResponse)(res, 'Cart updated successfully', cartToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const getAllCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const carts = yield cart_service_1.CartService.getAllCarts();
        if (!carts) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching carts');
        }
        (0, sendResponse_1.sendResponse)(res, 'Carts fetched successfully', carts);
    }
    catch (error) {
        next(error);
    }
});
const getUserCarts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const carts = yield cart_service_1.CartService.getUserCart(id);
        if (!carts) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching carts');
        }
        (0, sendResponse_1.sendResponse)(res, 'Carts fetched successfully', carts);
    }
    catch (error) {
        next(error);
    }
});
exports.CartController = {
    createCart,
    deleteCart,
    updateCart,
    getAllCarts,
    getUserCarts
};
