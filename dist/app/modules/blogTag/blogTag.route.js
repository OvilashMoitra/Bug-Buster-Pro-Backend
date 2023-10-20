"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogTagRouter = void 0;
const express_1 = __importDefault(require("express"));
const blogTag_controller_1 = require("./blogTag.controller");
exports.BlogTagRouter = express_1.default.Router();
exports.BlogTagRouter.post('/create-tag', blogTag_controller_1.BlogTagController.createTag);
exports.BlogTagRouter.get('/', blogTag_controller_1.BlogTagController.getAllTag);
exports.BlogTagRouter.patch('/:id', blogTag_controller_1.BlogTagController.updateTag);
