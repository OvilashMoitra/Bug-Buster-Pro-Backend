import Express from 'express';
import { BlogController } from './blog.controller';


export const BlogRouter = Express.Router();

BlogRouter.post('/create-blog', BlogController.createBlog);

BlogRouter.get('/', BlogController.getAllBlog);

BlogRouter.patch('/:id', BlogController.updateBlog);

BlogRouter.get('/:id', BlogController.getBlog);

BlogRouter.delete('/:id', BlogController.deleteBlog);


