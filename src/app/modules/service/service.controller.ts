import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { ServiceService } from './service.service';



const createService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const serviceInfo = req.body;

        const service = await ServiceService.createService(serviceInfo);

        if (!service) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error creating service');
        }

        sendResponse(res, 'Service have created successfully', service);
    } catch (error) {
        next(error);
    }
};

const getAllService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const services = await ServiceService.getAllService();

        if (!services) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error fetching all services');
        }

        sendResponse(res, 'Services have fetched successfully', services);
    } catch (error) {
        next(error);
    }
};
const getService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const service = await ServiceService.getService(id);

        if (!service) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error fetching service');
        }

        sendResponse(res, 'Service have fetched successfully', service);
    } catch (error) {
        next(error);
    }
};

const updateService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const serviceInfo = req.body;

        const serviceToUpdate = await ServiceService.updateService(serviceInfo, id);

        if (!serviceToUpdate) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating the service');
        }

        sendResponse(res, 'service have updated successfully', serviceToUpdate);
    } catch (error) {
        next(error);
    }
};
const deleteService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        const serviceToDelete = await ServiceService.deleteService(id);

        if (!serviceToDelete) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error deleting the service');
        }

        sendResponse(res, 'service have deleted successfully', serviceToDelete);
    } catch (error) {
        next(error);
    }
};


export const ServiceController = {
    createService,
    deleteService,
    getAllService,
    updateService,
    getService
};
