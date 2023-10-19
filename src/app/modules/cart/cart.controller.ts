/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { CartService } from './cart.service';

const createCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartInfo = req.body;
        const cart = await CartService.createCart(cartInfo);
        if (!cart) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating cart');
        }
        sendResponse(res, 'Cart created successfully', cart);
    } catch (error) {
        next(error);
    }
};

const deleteCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartId = req.params.id;
        const cartToDelete = await CartService.deleteCart(cartId);
        if (!cartToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting cart');
        }
        sendResponse(res, 'Cart deleted successfully', cartToDelete);
    } catch (error) {
        next(error);
    }
};

const updateCart = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const cartId = req.params.id;
        const cartInfo = req.body;
        const cartToUpdate = await CartService.updateCart(cartId, cartInfo);
        if (!cartToUpdate) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating cart');
        }
        sendResponse(res, 'Cart updated successfully', cartToUpdate);
    } catch (error) {
        next(error);
    }
};

const getAllCarts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const carts = await CartService.getAllCarts();
        if (!carts) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching carts');
        }
        sendResponse(res, 'Carts fetched successfully', carts);
    } catch (error) {
        next(error);
    }
};
const getUserCarts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const carts = await CartService.getUserCart(id);
        if (!carts) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching carts');
        }
        sendResponse(res, 'Carts fetched successfully', carts);
    } catch (error) {
        next(error);
    }
};

export const CartController = {
    createCart,
    deleteCart,
    updateCart,
    getAllCarts,
    getUserCarts
};
