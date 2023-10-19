import express from 'express';
import { AuthRouter } from '../modules/auth/auth.route';
import { BlogRouter } from '../modules/blog/blog.route';
import { BlogTagRouter } from '../modules/blogTag/blogTag.route';
import { CartRouter } from '../modules/cart/cart.route';
import { FAQRouter } from '../modules/faq/faq.route';
import { JobRouter } from '../modules/job/job.route';
import { OrderRouter } from '../modules/order/order.route';
import { RoleRouter } from '../modules/role/role.route';
import { ServiceRouter } from '../modules/service/service.route';
import { StatsRouter } from '../modules/stats/stats.route';

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
  {
    path: "/faq",
    routes: FAQRouter
  },
  {
    path: "/service",
    routes: ServiceRouter
  },
  {
    path: "/stats",
    routes: StatsRouter
  },
  {
    path: "/cart",
    routes: CartRouter
  },
  {
    path: "/job",
    routes: JobRouter
  },
  {
    path: "/orders",
    routes: OrderRouter
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
