"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsRouter = void 0;
const express_1 = __importDefault(require("express"));
const stats_controller_1 = require("./stats.controller");
exports.StatsRouter = express_1.default.Router();
exports.StatsRouter.post('/create-stats', stats_controller_1.StatsController.createStats);
exports.StatsRouter.get('/', stats_controller_1.StatsController.getAllStats);
exports.StatsRouter.get('/updatePageView', stats_controller_1.StatsController.updatePageView);
// StatsRouter.patch('/', StatsController.updateStats);
