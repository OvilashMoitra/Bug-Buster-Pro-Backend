/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { sendEmail } from '../../../helpers/email/emailSender';
import { jwtHelperFunction } from '../../../helpers/jwt/jwt';
import { sendResponse } from '../../../shared/sendResponse';
import { resetPasswordTemplate } from '../../emailTemplate/emailTemplate';
import { AuthService } from './auth.service';

const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body;
        const user = await AuthService.signup(userInfo);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error user signup');
        }

        sendResponse(res, 'User created successfully ', user);
    } catch (error) {
        next(error);
    }
};
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userInfo = req.body;
        const user = await AuthService.login(userInfo);
        if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error user signup');
        }

        // jwt token
        const payload = {
            _id: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await jwtHelperFunction.generateJWTToken(
            payload,
            config.jwt.expires_in!,
            config.jwt.secret!,
        );
        const refreshToken = await jwtHelperFunction.generateJWTToken(
            payload,
            config.jwt.refresh_expires_in!,
            config.jwt.refresh_secret!,
        );

        // cookie setting to user browser
        const cookieOptions = {
            secure: config.env === 'production',
            httpOnly: true,
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        res.cookie('refreshToken', refreshToken);
        const modifiedResponse = { accessToken, user };

        sendResponse(res, 'User logged in successfully ', modifiedResponse);
    } catch (error) {
        next(error);
    }
};

const changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userInfo = req.body;
    try {
        const user = await AuthService.makeResetPassword(userInfo);


        sendResponse(res, 'Password changed successfully', user);
    } catch (error) {
        next(error);
    }
};

const initiateResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userEmail = req.body;
        const user = await AuthService.initiateResetPassword(userEmail);
        // jwt token to reset password
        const jwtData = {
            _id: user.id,
            email: user.email,
            role: user.role
        };
        const resetPasswordToken = await jwtHelperFunction.generateJWTToken(
            jwtData,
            config.resetPassword_token_expiresIn!,
            config.resetPassword_token_secret!,
        );

        const emailBody = resetPasswordTemplate(resetPasswordToken);

        if (user) {
            await sendEmail(user.email, 'Password Reset', emailBody);
        }

        sendResponse(res, 'An email have sent to your email', user);
    } catch (error) {
        next(error);
    }
};

const makeResetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const userInfo = req.body;
        const token = req.params.token;

        // token validation
        const jwtPayload = await jwtHelperFunction.decodeJWTToken(
            token,
            config.resetPassword_token_secret!,
        );

        if (!jwtPayload) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, 'Reset token is invalid');
        }

        const user = await AuthService.makeResetPassword(userInfo);


        sendResponse(res, 'Password have changed successfully', user);
    } catch (error) {
        next(error);
    }
};

export const AuthController = {
    signup,
    login,
    changePassword,
    initiateResetPassword,
    makeResetPassword,
};
