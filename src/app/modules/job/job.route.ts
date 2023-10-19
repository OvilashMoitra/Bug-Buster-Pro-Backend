import Express from 'express';
import { JobController } from './job.controller';

export const JobRouter = Express.Router();

JobRouter.post('/create-job', JobController.createJob);

JobRouter.get('/', JobController.getAllJobs);

JobRouter.patch('/:id', JobController.updateJob);

JobRouter.delete('/:id', JobController.deleteJob);
