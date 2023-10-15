import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
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
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
