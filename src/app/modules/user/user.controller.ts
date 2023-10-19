import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { UserService } from './user.service';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body;
        const user = await UserService.createUser(userInfo);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating user');
        }
        sendResponse(res, 'User created successfully', user);
    } catch (error) {
        next(error);
    }
};

// const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const userId = req.params.id;
//         const deletedUser = await UserService.deleteUser(userId);
//         if (!deletedUser) {
//             throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting user');
//         }
//         sendResponse(res, 'User deleted successfully', deletedUser);
//     } catch (error) {
//         next(error);
//     }
// };

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAllUsers();
        if (!users) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching users');
        }
        sendResponse(res, 'Users fetched successfully', users);
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }
        sendResponse(res, 'User fetched successfully', user);
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const userInfoToUpdate = req.body;

        const updatedUser = await UserService.updateUser(userInfoToUpdate, userId);

        if (!updatedUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating user');
        }

        sendResponse(res, 'User updated successfully', updatedUser);
    } catch (error) {
        next(error);
    }
};

export const UserController = {
    createUser,
    // deleteUser,
    getAllUsers,
    getUserById,
    updateUser
};
