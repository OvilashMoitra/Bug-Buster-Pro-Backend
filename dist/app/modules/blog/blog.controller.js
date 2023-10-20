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
exports.BlogController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const blog_service_1 = require("./blog.service");
const createBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogInfo = req.body;
        const blog = yield blog_service_1.BlogService.createBlog(blogInfo);
        if (!blog) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating blog');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog created successfully ', blog);
    }
    catch (error) {
        next(error);
    }
});
const deleteBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blogToDelete = yield blog_service_1.BlogService.deleteBlog(blogId);
        if (!blogToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting blog');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog deleted successfully ', blogToDelete);
    }
    catch (error) {
        next(error);
    }
});
const updateBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blogInfo = req.body;
        const blogToUpdate = yield blog_service_1.BlogService.updateBlog(blogInfo, blogId);
        if (!blogToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating blog');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog updated successfully ', blogToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const getBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogId = req.params.id;
        const blog = yield blog_service_1.BlogService.getBlog(blogId);
        if (!blog) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching blog');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog fetched successfully ', blog);
    }
    catch (error) {
        next(error);
    }
});
const getAllBlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield blog_service_1.BlogService.getAllBlog();
        if (!blogs) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching blogs');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog fetched successfully ', blogs);
    }
    catch (error) {
        next(error);
    }
});
exports.BlogController = {
    createBlog,
    deleteBlog,
    updateBlog,
    getBlog,
    getAllBlog,
};
