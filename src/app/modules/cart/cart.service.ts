/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Cart } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import ApiError from '../../../errors/ApiError';

const createCart = async (payload: Cart) => {
    const cart = await prisma.cart.create({
        data: payload,
        include: {
            auth: true,
            product: true,
        },
    });

    return cart;
};

const deleteCart = async (id: string) => {
    const cartToDelete = await prisma.cart.delete({
        where: {
            id: id,
        },
    });

    return cartToDelete;
};

const updateCart = async (id: string, payload: Partial<Cart>) => {
    const cartToUpdate = await prisma.cart.update({
        data: payload,
        where: {
            id: id,
        },
        include: {
            auth: true,
            product: true,
        },
    });

    if (!cartToUpdate) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No cart found');
    }

    return cartToUpdate;
};

const getAllCarts = async () => {
    const carts = await prisma.cart.findMany({
        include: {
            auth: true,
            product: true,
        },
    });

    return carts;
};
const getUserCart = async (id: string) => {
    const carts = await prisma.cart.findMany({
        where: {
            id
        },
        include: {
            product: true,
            auth: true
        }
    });

    return carts;
};

export const CartService = {
    createCart,
    deleteCart,
    updateCart,
    getAllCarts,
    getUserCart
};
