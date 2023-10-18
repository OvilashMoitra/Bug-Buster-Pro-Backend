/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Service } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';



const createService = async (payload: Service) => {
    const service = await prisma.service.create({
        data: payload
    },
    )

    return service;
};



const deleteService = async (payload: string) => {
    const serviceToDeleted = await prisma.service.delete({
        where: {
            id: payload
        }
    })

    return serviceToDeleted;
};

const updateService = async (
    payload: Partial<Service>,
    id: string
) => {

    const serviceToUpdate = await prisma.service.update({
        data: payload,
        where: {
            id: id
        },
        include: {
            auth: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    })

    if (!serviceToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Service found');
    }

    return serviceToUpdate;
};

const getService = async (id: string) => {
    const service = await prisma.service.findUnique({
        where: {
            id: id
        },
        include: {
            auth: {
                select: {
                    id: true,
                    email: true
                }
            }
        }
    })

    if (!service) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Service found');
    }

    return service;
}
const getAllService = async () => {
    const services = await prisma.service.findMany({
        include: {
            auth: {
                select: {
                    email: true,
                    id: true,
                }
            }
        }
    })
    if (!services) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No Services found');
    }
    return services;
}

export const ServiceService = {
    createService,
    getAllService,
    deleteService,
    updateService,
    getService
};
