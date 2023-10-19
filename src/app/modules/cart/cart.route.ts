import Express from 'express';
import { CartController } from './cart.controller';

export const CartRouter = Express.Router();

CartRouter.post('/create-cart', CartController.createCart);

CartRouter.get('/', CartController.getAllCarts);

CartRouter.get('/:id', CartController.getUserCarts);

CartRouter.patch('/:id', CartController.updateCart);

CartRouter.delete('/:id', CartController.deleteCart);
