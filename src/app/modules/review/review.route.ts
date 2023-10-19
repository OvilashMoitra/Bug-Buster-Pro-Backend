import Express from 'express';
import { ReviewController } from './review.controller';

export const ReviewRouter = Express.Router();

ReviewRouter.post('/create-review', ReviewController.createReview);
// ReviewRouter.get('/', ReviewController.getAllReviews);
ReviewRouter.get('/:id', ReviewController.getReview);
ReviewRouter.patch('/:id', ReviewController.updateReview);
ReviewRouter.delete('/:id', ReviewController.deleteReview);
