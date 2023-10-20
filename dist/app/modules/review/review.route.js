"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRouter = void 0;
const express_1 = __importDefault(require("express"));
const review_controller_1 = require("./review.controller");
exports.ReviewRouter = express_1.default.Router();
exports.ReviewRouter.post('/create-review', review_controller_1.ReviewController.createReview);
// ReviewRouter.get('/', ReviewController.getAllReviews);
exports.ReviewRouter.get('/:id', review_controller_1.ReviewController.getReview);
exports.ReviewRouter.patch('/:id', review_controller_1.ReviewController.updateReview);
exports.ReviewRouter.delete('/:id', review_controller_1.ReviewController.deleteReview);
