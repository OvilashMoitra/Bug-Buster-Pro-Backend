/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { StatsService } from './stats.service';


const createStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statInfo = req.body;
        const stats = await StatsService.createStats(statInfo);
        if (!stats) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating faq');
        }
        sendResponse(res, 'Stat created successfully ', stats);
    } catch (error) {
        next(error);
    }
};

const updatePageView = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const statsToUpdate = await StatsService.updatePageView();

        if (!statsToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating stats');
        }
        sendResponse(res, 'Stats updated successfully ', statsToUpdate);
    } catch (error) {
        next(error);
    }
};
const getAllStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = await StatsService.getAllStats();
        if (!stats) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching faqs');
        }
        sendResponse(res, 'faqs fetched successfully ', stats);
    } catch (error) {
        next(error);
    }
};


export const StatsController = {
    createStats,
    updatePageView,
    getAllStats,
};
