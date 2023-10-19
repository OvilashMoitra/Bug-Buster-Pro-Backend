import Express from 'express';
import { OrderController } from './order.controller';

export const OrderRouter = Express.Router();

OrderRouter.post('/create-order', OrderController.createOrder);

OrderRouter.get('/', OrderController.getAllOrders);

OrderRouter.get('/:id', OrderController.getUserOrders);

OrderRouter.patch('/:id', OrderController.updateOrder);

OrderRouter.delete('/:id', OrderController.deleteOrder);
