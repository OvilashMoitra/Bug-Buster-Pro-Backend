import Express from 'express';
import { StatsController } from './stats.controller';




export const StatsRouter = Express.Router();

StatsRouter.post('/create-stats', StatsController.createStats);

StatsRouter.get('/', StatsController.getAllStats);

StatsRouter.patch('/:id', StatsController.updateStats);



