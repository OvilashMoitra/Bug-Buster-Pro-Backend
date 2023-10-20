"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRouter = void 0;
const express_1 = __importDefault(require("express"));
const role_controller_1 = require("./role.controller");
exports.RoleRouter = express_1.default.Router();
exports.RoleRouter.post('/create-role', role_controller_1.RoleController.createRole);
exports.RoleRouter.get('/', role_controller_1.RoleController.getAllRole);
exports.RoleRouter.patch('/:id', role_controller_1.RoleController.updateRole);
