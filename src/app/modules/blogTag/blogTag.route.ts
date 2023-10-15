import express from 'express';
import { BlogTagController } from './blogTag.controller';


export const BlogTagRouter = express.Router();

BlogTagRouter.post('/create-tag', BlogTagController.createTag);
BlogTagRouter.get('/', BlogTagController.getAllTag);
BlogTagRouter.patch('/:id', BlogTagController.updateTag);

