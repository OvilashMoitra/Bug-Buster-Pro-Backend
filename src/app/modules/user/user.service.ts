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
    const user = await prisma.user.findMany({
        where: {
            authId: userId,
        },
        include: {
            auth: {
                select: {
                    email: true,
                    id: true
                }
            }
        }
    });

    console.log(user);

    return user[0];
};

const updateUser = async (payload: UserPayload, userId: string) => {

    console.log(payload);
    console.log(userId);
    const existingUser = await prisma.auth.findUnique({
            where: {
                id: userId,
            },
        });

        if (!existingUser) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }

        // Update the properties of the existing user based on the payload
    const updatedUser = await prisma.user.updateMany({
            where: {
            authId: userId
            },
            data: payload,
    }) as unknown as User[];
    console.log("updated user", updatedUser);
    return updatedUser?.[0];
};

export const UserService = {
    createUser,
    // deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
};
