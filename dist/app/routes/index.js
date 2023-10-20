"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const blog_route_1 = require("../modules/blog/blog.route");
const blogTag_route_1 = require("../modules/blogTag/blogTag.route");
const cart_route_1 = require("../modules/cart/cart.route");
const contact_route_1 = require("../modules/contact/contact.route");
const faq_route_1 = require("../modules/faq/faq.route");
const job_route_1 = require("../modules/job/job.route");
const order_route_1 = require("../modules/order/order.route");
const review_route_1 = require("../modules/review/review.route");
const role_route_1 = require("../modules/role/role.route");
const service_route_1 = require("../modules/service/service.route");
const stats_route_1 = require("../modules/stats/stats.route");
const user_route_1 = require("../modules/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: "/role",
        routes: role_route_1.RoleRouter
    },
    {
        path: "/auth",
        routes: auth_route_1.AuthRouter
    },
    {
        path: "/blogTag",
        routes: blogTag_route_1.BlogTagRouter
    },
    {
        path: "/blog",
        routes: blog_route_1.BlogRouter
    },
    {
        path: "/faq",
        routes: faq_route_1.FAQRouter
    },
    {
        path: "/service",
        routes: service_route_1.ServiceRouter
    },
    {
        path: "/stats",
        routes: stats_route_1.StatsRouter
    },
    {
        path: "/cart",
        routes: cart_route_1.CartRouter
    },
    {
        path: "/job",
        routes: job_route_1.JobRouter
    },
    {
        path: "/orders",
        routes: order_route_1.OrderRouter
    },
    {
        path: "/review",
        routes: review_route_1.ReviewRouter
    },
    {
        path: "/user",
        routes: user_route_1.UserRouter
    },
    {
        path: "/contact",
        routes: contact_route_1.ContactRouter
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
