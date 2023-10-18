import Express from 'express';
import { ServiceController } from './service.controller';




export const ServiceRouter = Express.Router();


ServiceRouter.post('/create-service', ServiceController.createService);


ServiceRouter.get('/', ServiceController.getAllService);


ServiceRouter.get('/:id', ServiceController.getService);

ServiceRouter.patch('/:id', ServiceController.updateService);


ServiceRouter.delete('/:id', ServiceController.deleteService);


