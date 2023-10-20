"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRouter = void 0;
const express_1 = __importDefault(require("express"));
const contact_controller_1 = require("./contact.controller");
exports.ContactRouter = express_1.default.Router();
exports.ContactRouter.post('/create-contact', contact_controller_1.ContactController.createContact);
exports.ContactRouter.get('/', contact_controller_1.ContactController.getAllContacts);
exports.ContactRouter.patch('/:id', contact_controller_1.ContactController.updateContact);
exports.ContactRouter.delete('/:id', contact_controller_1.ContactController.deleteContact);
