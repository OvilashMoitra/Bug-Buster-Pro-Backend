"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("./blog.controller");
exports.BlogRouter = express_1.default.Router();
exports.BlogRouter.post('/create-blog', blog_controller_1.BlogController.createBlog);
exports.BlogRouter.get('/', blog_controller_1.BlogController.getAllBlog);
exports.BlogRouter.patch('/:id', blog_controller_1.BlogController.updateBlog);
exports.BlogRouter.get('/:id', blog_controller_1.BlogController.getBlog);
exports.BlogRouter.delete('/:id', blog_controller_1.BlogController.deleteBlog);
