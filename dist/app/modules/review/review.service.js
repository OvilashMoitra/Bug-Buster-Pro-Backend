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
exports.ReviewService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createReview = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.orderId) {
        const order = yield app_1.prisma.order.findMany({
            where: {
                id: payload.orderId,
            }
        });
        if (!order) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No Order found');
        }
    }
    if (payload.rating > 5 || payload.rating < 0) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid rating');
    }
    const review = yield app_1.prisma.review.create({
        data: payload,
    });
    return review;
});
const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
    const reviewToDelete = yield app_1.prisma.review.delete({
        where: {
            id: reviewId,
        },
    });
    return reviewToDelete;
});
const updateReview = (reviewId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield app_1.prisma.order.findUnique({
        where: {
            id: payload.orderId,
        }
    });
    if (!order) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No Order found');
    }
    if (payload.rating && (payload.rating > 5 || payload.rating < 0)) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Invalid rating');
    }
    const reviewToUpdate = yield app_1.prisma.review.update({
        data: payload,
        where: {
            id: reviewId,
        },
    });
    if (!reviewToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No Review found');
    }
    return reviewToUpdate;
});
const getReview = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield app_1.prisma.review.findMany({
        where: {
            serviceId: serviceId,
        }
    });
    if (!review) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No Review found');
    }
    return review;
});
// const getAllReviews = async () => {
//     const reviews = await prisma.review.findMany();
//     if (!reviews) {
//         throw new ApiError(StatusCodes.BAD_REQUEST, 'No Reviews found');
//     }
//     return reviews;
// };
exports.ReviewService = {
    createReview,
    deleteReview,
    updateReview,
    getReview,
    // getAllReviews,
};
