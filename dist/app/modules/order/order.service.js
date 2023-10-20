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
exports.OrderService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the service and customer exist in the database
    const service = yield app_1.prisma.service.findUnique({
        where: {
            id: payload.serviceId,
        },
    });
    const customer = yield app_1.prisma.auth.findUnique({
        where: {
            id: payload.customerId,
        },
    });
    if (!service || !customer) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Service or customer not found');
    }
    const orderResponse = app_1.prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield tx.order.create({
            data: {
                serviceId: payload.serviceId,
                customerId: payload.customerId,
                phoneNumber: payload.phoneNumber
            },
            include: {
                service: true,
                customer: true,
            },
        });
        tx.websiteStats.update({
            data: {
                orders: { increment: 1 }
            },
            where: {
                id: config_1.default.stats_id
            }
        });
        return order;
    }));
    return orderResponse;
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const orderToDelete = yield app_1.prisma.order.delete({
        where: {
            id: orderId,
        },
    });
    return orderToDelete;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield app_1.prisma.order.findMany({
        include: {
            service: true,
            customer: true,
        },
    });
    return orders;
});
const getUserOrders = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield app_1.prisma.order.findMany({
        where: {
            customerId: id
        },
        include: {
            service: true,
            customer: true,
        },
    });
    return orders;
});
const updateOrder = (payload, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingOrder = yield app_1.prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });
        if (!existingOrder) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Order not found');
        }
        // Update the properties of the existing order based on the payload
        const updatedOrder = yield app_1.prisma.order.update({
            where: {
                id: orderId,
            },
            data: payload,
        });
        return updatedOrder;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating order');
    }
});
exports.OrderService = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
};
