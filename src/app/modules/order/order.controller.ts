import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { sendResponse } from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderInfo = req.body;
        const order = await OrderService.createOrder(orderInfo);
        if (!order) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error creating order');
        }
        sendResponse(res, 'Order created successfully', order);
    } catch (error) {
        next(error);
    }
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        const orderToDelete = await OrderService.deleteOrder(orderId);
        if (!orderToDelete) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error deleting order');
        }
        sendResponse(res, 'Order deleted successfully', orderToDelete);
    } catch (error) {
        next(error);
    }
};

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orders = await OrderService.getAllOrders();
        if (!orders) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        sendResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
        next(error);
    }
};

const getUserOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const orders = await OrderService.getUserOrders(id);
        if (!orders) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error fetching orders');
        }
        sendResponse(res, 'Orders fetched successfully', orders);
    } catch (error) {
        next(error);
    }
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const orderId = req.params.id;
        const orderInfoToUpdate = req.body;

        const updatedOrder = await OrderService.updateOrder(orderInfoToUpdate, orderId);

        if (!updatedOrder) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Error updating order');
        }

        sendResponse(res, 'Order updated successfully', updatedOrder);
    } catch (error) {
        next(error);
    }
};

export const OrderController = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrder
};
