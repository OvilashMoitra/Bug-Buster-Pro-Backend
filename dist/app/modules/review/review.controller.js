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
exports.ReviewController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const review_service_1 = require("./review.service");
const createReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewInfo = req.body;
        const review = yield review_service_1.ReviewService.createReview(reviewInfo);
        if (!review) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating review');
        }
        (0, sendResponse_1.sendResponse)(res, 'Review created successfully', review);
    }
    catch (error) {
        next(error);
    }
});
const deleteReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        const reviewToDelete = yield review_service_1.ReviewService.deleteReview(reviewId);
        if (!reviewToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting review');
        }
        (0, sendResponse_1.sendResponse)(res, 'Review deleted successfully', reviewToDelete);
    }
    catch (error) {
        next(error);
    }
});
const getReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        const review = yield review_service_1.ReviewService.getReview(reviewId);
        if (!review) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching review');
        }
        (0, sendResponse_1.sendResponse)(res, 'Review fetched successfully', review);
    }
    catch (error) {
        next(error);
    }
});
const updateReview = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewId = req.params.id;
        const reviewInfoToUpdate = req.body;
        const updatedReview = yield review_service_1.ReviewService.updateReview(reviewId, reviewInfoToUpdate);
        if (!updatedReview) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating review');
        }
        (0, sendResponse_1.sendResponse)(res, 'Review updated successfully', updatedReview);
    }
    catch (error) {
        next(error);
    }
});
exports.ReviewController = {
    createReview,
    deleteReview,
    getReview,
    updateReview,
};
