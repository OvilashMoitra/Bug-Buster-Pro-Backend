"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FAQRouter = void 0;
const express_1 = __importDefault(require("express"));
const faq_controller_1 = require("./faq.controller");
exports.FAQRouter = express_1.default.Router();
exports.FAQRouter.post('/create-faq', faq_controller_1.FAQController.createFAQ);
exports.FAQRouter.get('/', faq_controller_1.FAQController.getAllFAQ);
exports.FAQRouter.patch('/:id', faq_controller_1.FAQController.updateFAQ);
exports.FAQRouter.delete('/:id', faq_controller_1.FAQController.deleteFAQ);
