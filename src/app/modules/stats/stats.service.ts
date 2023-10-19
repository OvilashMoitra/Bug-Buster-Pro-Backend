/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WebsiteStats } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';



const createStats = async (payload: WebsiteStats) => {
    const stats = await prisma.websiteStats.create({
        data: payload,
    },
    )
    return stats;
};


const updatePageView = async () => {
    const statsToUpdate = await prisma.websiteStats.update({
        data: {
            websiteVisits: { increment: 1 },
        },
        where: {
            id: config.stats_id
        },
    })

    if (!statsToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No stats found');
    }

    return statsToUpdate;
};


const getAllStats = async () => {
    const stat = await prisma.websiteStats.findMany()

    return stat;
}

export const StatsService = {
    createStats,
    updatePageView,
    getAllStats,
};
