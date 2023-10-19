import { Order } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../../app';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

type OrderPayload = {
    serviceId: string;
    customerId: string;
    phoneNumber: string;
}

const createOrder = async (payload: OrderPayload): Promise<Order> => {
    // Check if the service and customer exist in the database
    const service = await prisma.service.findUnique({
        where: {
            id: payload.serviceId,
        },
    });

    const customer = await prisma.auth.findUnique({
        where: {
            id: payload.customerId,
        },
    });

    if (!service || !customer) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Service or customer not found');
    }

    const orderResponse = prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
            data: {
                serviceId: payload.serviceId,
                customerId: payload.customerId,
                phoneNumber: payload.phoneNumber
            },
            include: {
                service: true,
                customer: true,
            },
        });

        tx.websiteStats.update({
            data: {
                orders: { increment: 1 }
            },
            where: {
                id: config.stats_id
            }
        })

        return order;
    })

    return orderResponse;

};

const deleteOrder = async (orderId: string): Promise<Order> => {
    const orderToDelete = await prisma.order.delete({
        where: {
            id: orderId,
        },
    });

    return orderToDelete;
};

const getAllOrders = async (): Promise<Order[]> => {
    const orders = await prisma.order.findMany({
        include: {
            service: true,
            customer: true,
        },
    });

    return orders;
};

const getUserOrders = async (id: string): Promise<Order[]> => {
    const orders = await prisma.order.findMany({
        where: {
            customerId: id
        },
        include: {
            service: true,
            customer: true,
        },
    });

    return orders;
};

const updateOrder = async (payload: Pick<Order, "status">, orderId: string): Promise<Order | null> => {
    try {
        const existingOrder = await prisma.order.findUnique({
            where: {
                id: orderId,
            },
        });

        if (!existingOrder) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Order not found');
        }

        // Update the properties of the existing order based on the payload
        const updatedOrder = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: payload,
        });

        return updatedOrder;
    } catch (error) {
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, 'Error updating order');
    }
};

export const OrderService = {
    createOrder,
    deleteOrder,
    getAllOrders,
    getUserOrders,
    updateOrder,
};
