import Express from 'express';
import { AuthController } from './auth.controller';

export const AuthRouter = Express.Router();

AuthRouter.post('/signup', AuthController.signup);

AuthRouter.post('/login', AuthController.login);

AuthRouter.post('/change-password', AuthController.changePassword);

AuthRouter.post('/reset-password', AuthController.initiateResetPassword);

AuthRouter.post('/reset-password/:token', AuthController.makeResetPassword);

// crud user
AuthRouter.get('/:id', AuthController.getUser);

AuthRouter.get('/', AuthController.getAllUser);

AuthRouter.patch('/:id', AuthController.updateUser);
