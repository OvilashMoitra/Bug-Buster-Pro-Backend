"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRouter = void 0;
const express_1 = __importDefault(require("express"));
const service_controller_1 = require("./service.controller");
exports.ServiceRouter = express_1.default.Router();
exports.ServiceRouter.post('/create-service', service_controller_1.ServiceController.createService);
exports.ServiceRouter.get('/', service_controller_1.ServiceController.getAllService);
exports.ServiceRouter.get('/:id', service_controller_1.ServiceController.getService);
exports.ServiceRouter.patch('/:id', service_controller_1.ServiceController.updateService);
exports.ServiceRouter.delete('/:id', service_controller_1.ServiceController.deleteService);
