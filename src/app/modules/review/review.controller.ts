import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const createReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewInfo = req.body;
        const review = await ReviewService.createReview(reviewInfo);
        if (!review) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating review');
        }
        sendResponse(res, 'Review created successfully', review);
    } catch (error) {
        next(error);
    }
};

const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id;
        const reviewToDelete = await ReviewService.deleteReview(reviewId);
        if (!reviewToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting review');
        }
        sendResponse(res, 'Review deleted successfully', reviewToDelete);
    } catch (error) {
        next(error);
    }
};


const getReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id;
        const review = await ReviewService.getReview(reviewId);
        if (!review) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching review');
        }
        sendResponse(res, 'Review fetched successfully', review);
    } catch (error) {
        next(error);
    }
};

const updateReview = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviewId = req.params.id;
        const reviewInfoToUpdate = req.body;
        const updatedReview = await ReviewService.updateReview(reviewId, reviewInfoToUpdate);
        if (!updatedReview) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating review');
        }
        sendResponse(res, 'Review updated successfully', updatedReview);
    } catch (error) {
        next(error);
    }
};

export const ReviewController = {
    createReview,
    deleteReview,
    getReview,
    updateReview,
};
