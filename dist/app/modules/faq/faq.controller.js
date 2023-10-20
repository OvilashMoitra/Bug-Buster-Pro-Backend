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
exports.FAQController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const faq_service_1 = require("./faq.service");
const createFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqInfo = req.body;
        const faq = yield faq_service_1.FAQService.createFAQ(faqInfo);
        if (!faq) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating faq');
        }
        (0, sendResponse_1.sendResponse)(res, 'faq created successfully ', faq);
    }
    catch (error) {
        next(error);
    }
});
const deleteFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqId = req.params.id;
        const faqToDelete = yield faq_service_1.FAQService.deleteFAQ(faqId);
        if (!faqToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting faq');
        }
        (0, sendResponse_1.sendResponse)(res, 'blog deleted successfully ', faqToDelete);
    }
    catch (error) {
        next(error);
    }
});
const updateFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqId = req.params.id;
        const faqInfo = req.body;
        const faqToUpdate = yield faq_service_1.FAQService.updateFAQ(faqInfo, faqId);
        if (!faqToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating faq');
        }
        (0, sendResponse_1.sendResponse)(res, 'faq updated successfully ', faqToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const getAllFAQ = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faqs = yield faq_service_1.FAQService.getAllFAQ();
        if (!faqs) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching faqs');
        }
        (0, sendResponse_1.sendResponse)(res, 'faqs fetched successfully ', faqs);
    }
    catch (error) {
        next(error);
    }
});
exports.FAQController = {
    createFAQ,
    deleteFAQ,
    updateFAQ,
    getAllFAQ,
};
