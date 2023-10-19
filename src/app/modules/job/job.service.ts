/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Job } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';

const createJob = async (payload: Job) => {
    const job = await prisma.job.create({
        data: payload,
        include: {
            role: true,
            author: true
        },
    });

    return job;
};

const deleteJob = async (id: string) => {
    const jobToDelete = await prisma.job.delete({
        where: {
            id: id,
        },
    });

    return jobToDelete;
};

const updateJob = async (id: string, payload: Partial<Job>) => {
    const jobToUpdate = await prisma.job.update({
        data: payload,
        where: {
            id: id,
        },
        include: {
            role: true,
            author: true,
        },
    });

    if (!jobToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No job found');
    }

    return jobToUpdate;
};

const getAllJobs = async () => {
    const jobs = await prisma.job.findMany({
        include: {
            role: true,
            author: true,
        },
    });

    return jobs;
};

export const JobService = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
};
