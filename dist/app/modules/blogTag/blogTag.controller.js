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
exports.BlogTagController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const blogTag_service_1 = require("./blogTag.service");
const createTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogTag = req.body;
        const tag = yield blogTag_service_1.BlogTagService.createTag(blogTag);
        if (!tag) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error creating role');
        }
        (0, sendResponse_1.sendResponse)(res, 'Tag have created successfully', tag);
    }
    catch (error) {
        next(error);
    }
});
const getAllTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield blogTag_service_1.BlogTagService.getAllTag();
        if (!tags) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error fetching all tags');
        }
        (0, sendResponse_1.sendResponse)(res, 'Tags have fetched successfully', tags);
    }
    catch (error) {
        next(error);
    }
});
const updateTag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const tagName = req.body;
        const tag = yield blogTag_service_1.BlogTagService.updatedTag(tagName, id);
        if (!tag) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error updating the tag');
        }
        (0, sendResponse_1.sendResponse)(res, 'Tag have updated successfully', tag);
    }
    catch (error) {
        next(error);
    }
});
exports.BlogTagController = {
    createTag,
    getAllTag,
    updateTag,
};
