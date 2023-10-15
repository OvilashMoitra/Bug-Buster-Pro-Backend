import express from 'express';
import { RoleController } from './role.controller';

export const RoleRouter = express.Router();

RoleRouter.post('/create-role', RoleController.createRole);
RoleRouter.get('/', RoleController.getAllRole);
RoleRouter.patch('/:id', RoleController.updateRole);

