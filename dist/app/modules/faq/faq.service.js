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
exports.FAQService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createFAQ = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faq = yield app_1.prisma.fAQ.create({
        data: payload,
        include: {
            auth: true
        }
    });
    return faq;
});
const deleteFAQ = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const faqToDeleted = yield app_1.prisma.fAQ.delete({
        where: {
            id: payload
        }
    });
    return faqToDeleted;
});
const updateFAQ = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const faqToUpdate = yield app_1.prisma.fAQ.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            auth: true
        }
    });
    if (!faqToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No faq found');
    }
    return faqToUpdate;
});
const getAllFAQ = () => __awaiter(void 0, void 0, void 0, function* () {
    const faqs = yield app_1.prisma.fAQ.findMany({
        include: {
            auth: true
        }
    });
    return faqs;
});
exports.FAQService = {
    createFAQ,
    deleteFAQ,
    updateFAQ,
    getAllFAQ,
};
