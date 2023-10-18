/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { WebsiteStats } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';



const createStats = async (payload: WebsiteStats) => {
    const stats = await prisma.websiteStats.create({
        data: payload,

    },
    )
    return stats;
};


const updateStats = async (
    payload: Partial<WebsiteStats>,
    id: string
) => {

    const statsToUpdate = await prisma.websiteStats.update({
        data: payload,
        where: {
            id: id
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
    updateStats,
    getAllStats,
};
