/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { FAQService } from './faq.service';


const createFAQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faqInfo = req.body;
        const faq = await FAQService.createFAQ(faqInfo);
        if (!faq) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating faq');
        }
        sendResponse(res, 'faq created successfully ', faq);
    } catch (error) {
        next(error);
    }
};
const deleteFAQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faqId = req.params.id;
        const faqToDelete = await FAQService.deleteFAQ(faqId);
        if (!faqToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting faq');
        }
        sendResponse(res, 'blog deleted successfully ', faqToDelete);
    } catch (error) {
        next(error);
    }
};
const updateFAQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faqId = req.params.id;
        const faqInfo = req.body;
        const faqToUpdate = await FAQService.updateFAQ(faqInfo, faqId);

        if (!faqToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating faq');
        }
        sendResponse(res, 'faq updated successfully ', faqToUpdate);
    } catch (error) {
        next(error);
    }
};
const getAllFAQ = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faqs = await FAQService.getAllFAQ();
        if (!faqs) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching faqs');
        }
        sendResponse(res, 'faqs fetched successfully ', faqs);
    } catch (error) {
        next(error);
    }
};


export const FAQController = {
    createFAQ,
    deleteFAQ,
    updateFAQ,
    getAllFAQ,
};
