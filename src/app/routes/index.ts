import express from 'express';
import { RoleRouter } from '../modules/role/role.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/role",
    routes: RoleRouter
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
