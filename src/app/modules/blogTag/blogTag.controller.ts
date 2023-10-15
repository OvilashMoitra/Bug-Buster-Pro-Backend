import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { BlogTagService } from './blogTag.service';


const createTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blogTag = req.body;

        const tag = await BlogTagService.createTag(blogTag);

        if (!tag) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error creating role');
        }

        sendResponse(res, 'Tag have created successfully', tag);
    } catch (error) {
        next(error);
    }
};
const getAllTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await BlogTagService.getAllTag();

        if (!tags) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error fetching all tags');
        }

        sendResponse(res, 'Tags have fetched successfully', tags);
    } catch (error) {
        next(error);
    }
};
const updateTag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const tagName = req.body;

        const tag = await BlogTagService.updatedTag(tagName, id);

        if (!tag) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating the tag');
        }

        sendResponse(res, 'Tag have updated successfully', tag);
    } catch (error) {
        next(error);
    }
};


export const BlogTagController = {
    createTag,
    getAllTag,
    updateTag,
};
