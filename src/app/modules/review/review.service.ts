/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Review } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';


const createReview = async (payload: Review) => {
    if (payload.orderId) {
        const order = await prisma.order.findMany({
            where: {
                id: payload.orderId,
            }
        })


        if (!order) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'No Order found');
        }
    }

    if (payload.rating > 5 || payload.rating < 0) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid rating');
    }

    const review = await prisma.review.create({
        data: payload,
    });
    return review;

};

const deleteReview = async (reviewId: string) => {
    const reviewToDelete = await prisma.review.delete({
        where: {
            id: reviewId,
        },
    });

    return reviewToDelete;
};

const updateReview = async (reviewId: string, payload: Partial<Review>) => {
    const order = await prisma.order.findUnique({
        where: {
            id: payload.orderId,
        }
    })

    if (!order) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Order found');
    }
    if (payload.rating && (payload.rating > 5 || payload.rating < 0)) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid rating');
    }
    const reviewToUpdate = await prisma.review.update({
        data: payload,
        where: {
            id: reviewId,
        },
    });

    if (!reviewToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Review found');
    }

    return reviewToUpdate;
};

const getReview = async (serviceId: string) => {

    const review = await prisma.review.findMany({
        where: {
            serviceId: serviceId,
        }
    });

    if (!review) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Review found');
    }

    return review;
};

// const getAllReviews = async () => {
//     const reviews = await prisma.review.findMany();

//     if (!reviews) {
//         throw new ApiError(StatusCodes.BAD_REQUEST, 'No Reviews found');
//     }

//     return reviews;
// };

export const ReviewService = {
    createReview,
    deleteReview,
    updateReview,
    getReview,
    // getAllReviews,
};
