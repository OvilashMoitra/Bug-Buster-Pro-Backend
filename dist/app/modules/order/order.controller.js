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
exports.OrderController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const order_service_1 = require("./order.service");
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderInfo = req.body;
        const order = yield order_service_1.OrderService.createOrder(orderInfo);
        if (!order) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating order');
        }
        (0, sendResponse_1.sendResponse)(res, 'Order created successfully', order);
    }
    catch (error) {
        next(error);
    }
});
const deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const orderToDelete = yield order_service_1.OrderService.deleteOrder(orderId);
        if (!orderToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting order');
        }
        (0, sendResponse_1.sendResponse)(res, 'Order deleted successfully', orderToDelete);
    }
    catch (error) {
        next(error);
    }
});
const getAllOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderService.getAllOrders();
        if (!orders) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        (0, sendResponse_1.sendResponse)(res, 'Orders fetched successfully', orders);
    }
    catch (error) {
        next(error);
    }
});
const getUserOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const orders = yield order_service_1.OrderService.getUserOrders(id);
        if (!orders) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        (0, sendResponse_1.sendResponse)(res, 'Orders fetched successfully', orders);
    }
    catch (error) {
        next(error);
    }
});
const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderId = req.params.id;
        const orderInfoToUpdate = req.body;
        const updatedOrder = yield order_service_1.OrderService.updateOrder(orderInfoToUpdate, orderId);
        if (!updatedOrder) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating order');
        }
        (0, sendResponse_1.sendResponse)(res, 'Order updated successfully', updatedOrder);
    }
    catch (error) {
        next(error);
    }
});
exports.OrderController = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrder
};
