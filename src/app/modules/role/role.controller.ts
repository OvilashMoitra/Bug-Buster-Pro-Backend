import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { RoleService } from './role.service';


const createRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roleName = req.body;

        const role = await RoleService.createRole(roleName);

        if (!role) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error creating role');
        }

        sendResponse(res, 'Role have created successfully', role);
    } catch (error) {
        next(error);
    }
};
const getAllRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roles = await RoleService.getAllRole();

        if (!roles) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error fetching all roles');
        }

        sendResponse(res, 'Roles have fetched successfully', roles);
    } catch (error) {
        next(error);
    }
};
const updateRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const roleName = req.body;

        const role = await RoleService.updateRole(roleName, id);

        if (!role) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Error updating the role');
        }

        sendResponse(res, 'Role have updated successfully', role);
    } catch (error) {
        next(error);
    }
};


export const RoleController = {
    createRole,
    getAllRole,
    updateRole
};
