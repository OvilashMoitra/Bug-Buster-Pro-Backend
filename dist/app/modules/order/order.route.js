"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
exports.OrderRouter = express_1.default.Router();
exports.OrderRouter.post('/create-order', order_controller_1.OrderController.createOrder);
exports.OrderRouter.get('/', order_controller_1.OrderController.getAllOrders);
exports.OrderRouter.get('/:id', order_controller_1.OrderController.getUserOrders);
exports.OrderRouter.patch('/:id', order_controller_1.OrderController.updateOrder);
exports.OrderRouter.delete('/:id', order_controller_1.OrderController.deleteOrder);
