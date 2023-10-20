"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
exports.AuthRouter = express_1.default.Router();
exports.AuthRouter.post('/signup', auth_controller_1.AuthController.signup);
exports.AuthRouter.post('/login', auth_controller_1.AuthController.login);
exports.AuthRouter.post('/change-password', auth_controller_1.AuthController.changePassword);
exports.AuthRouter.post('/reset-password', auth_controller_1.AuthController.initiateResetPassword);
exports.AuthRouter.post('/reset-password/:token', auth_controller_1.AuthController.makeResetPassword);
// crud user
exports.AuthRouter.get('/:id', auth_controller_1.AuthController.getUser);
exports.AuthRouter.get('/', auth_controller_1.AuthController.getAllUser);
exports.AuthRouter.patch('/:id', auth_controller_1.AuthController.updateUser);
