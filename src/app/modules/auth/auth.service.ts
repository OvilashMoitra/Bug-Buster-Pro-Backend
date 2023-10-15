/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Auth } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';
import { passwordHelpers } from '../../../helpers/passwordHelper';



const signup = async (payload: Auth) => {
    console.log({ payload });
    if (payload.password) {
        payload.password = await passwordHelpers.hashPassword(payload.password);
    }

    const user = await prisma.auth.create({
        data: payload
    })
    const userWithOutPassword = passwordHelpers.exclude(user, 'password')
    return userWithOutPassword
};

const login = async (payload: Partial<Auth>) => {
    try {
        const userInfo = await prisma.auth.findUnique({
            where: {
                email: payload.email
            },

        })

        if (!userInfo) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
        }

        const isMatch = await passwordHelpers.compareHashPassword(
            payload.password!,
            userInfo.password,
        );
        if (!isMatch) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'Password does not match');
        }
        const userWithOutPassword = passwordHelpers.exclude(userInfo, 'password')
        return userWithOutPassword
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error during login');
    }
};


const initiateResetPassword = async (payload: Pick<Auth, 'email'>) => {
    const user = await prisma.auth.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User do not exist');
    }

    return user;
};

const makeResetPassword = async (
    payload: Pick<Auth, 'email' | 'password'>,
) => {
    const user = await prisma.auth.findUnique({
        where: {
            email: payload.email
        }
    })

    if (!user) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No user found');
    }
    const isMatched = await passwordHelpers.compareHashPassword(payload.password, user.password)

    if (isMatched) {
        throw new ApiError(
            StatusCodes.BAD_REQUEST,
            'Old password and new password can not be the same',
        );
    }
    const hashedPassword = await passwordHelpers.hashPassword(payload.password)
    const updatedUser = await prisma.auth.update({
        data: {
            password: hashedPassword
        },
        where: {
            email: payload.email
        }
    });

    const userWithOutPassword = passwordHelpers.exclude(updatedUser, 'password')

    return userWithOutPassword;
};

export const AuthService = {
    signup,
    login,
    initiateResetPassword,
    makeResetPassword,
};
