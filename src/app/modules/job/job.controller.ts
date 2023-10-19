/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { JobService } from './job.service';

const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobInfo = req.body;
        const job = await JobService.createJob(jobInfo);
        if (!job) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating job');
        }
        sendResponse(res, 'Job created successfully', job);
    } catch (error) {
        next(error);
    }
};

const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.id;
        const jobToDelete = await JobService.deleteJob(jobId);
        if (!jobToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting job');
        }
        sendResponse(res, 'Job deleted successfully', jobToDelete);
    } catch (error) {
        next(error);
    }
};

const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobId = req.params.id;
        const jobInfo = req.body;
        const jobToUpdate = await JobService.updateJob(jobId, jobInfo);
        if (!jobToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating job');
        }
        sendResponse(res, 'Job updated successfully', jobToUpdate);
    } catch (error) {
        next(error);
    }
};

const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await JobService.getAllJobs();
        if (!jobs) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching jobs');
        }
        sendResponse(res, 'Jobs fetched successfully', jobs);
    } catch (error) {
        next(error);
    }
};

export const JobController = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
};
