"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
exports.CartRouter = express_1.default.Router();
exports.CartRouter.post('/create-cart', cart_controller_1.CartController.createCart);
exports.CartRouter.get('/', cart_controller_1.CartController.getAllCarts);
exports.CartRouter.get('/:id', cart_controller_1.CartController.getUserCarts);
exports.CartRouter.patch('/:id', cart_controller_1.CartController.updateCart);
exports.CartRouter.delete('/:id', cart_controller_1.CartController.deleteCart);
