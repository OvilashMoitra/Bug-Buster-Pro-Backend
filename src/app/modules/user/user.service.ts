import { User } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';

type UserPayload = {
    phoneNumber?: string;
    userName?: string;
    authId: string;
    linkedIn?: string;
    dateOfBirth?: Date;
    isRemoved?: boolean;
}

const createUser = async (payload: User): Promise<User> => {

    const authExist = await prisma.auth.findUnique({
        where: {
            id: payload.authId
        }
    })
    if (!authExist) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You must sign up first');
    }

    const user = await prisma.user.create({
        data: payload,
    });

    return user;
};

// const deleteUser = async (userId: string): Promise<User> => {
//     const userToDelete = await prisma.user.delete({
//         where: {
//             id: userId,
//         },
//     });

//     return userToDelete;
// };

const getAllUsers = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
        include: {
            auth: true,
        }
    });
    return users;
};

const getUserById = async (userId: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });

    return user;
};

const updateUser = async (payload: UserPayload, userId: string): Promise<User | null> => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }

        // Update the properties of the existing user based on the payload
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: payload,
        });

        return updatedUser;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating user');
    }
};

export const UserService = {
    createUser,
    // deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
};
