import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRouter } from '../modules/blog/blog.route';
import { BlogTagRouter } from '../modules/blogTag/blogTag.route';
import { RoleRouter } from '../modules/role/role.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/role",
    routes: RoleRouter
  },
  {
    path: "/auth",
    routes: AuthRouter
  },
  {
    path: "/blogTag",
    routes: BlogTagRouter
  },
  {
    path: "/blog",
    routes: BlogRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
