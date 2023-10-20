"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRouter = void 0;
const express_1 = __importDefault(require("express"));
const job_controller_1 = require("./job.controller");
exports.JobRouter = express_1.default.Router();
exports.JobRouter.post('/create-job', job_controller_1.JobController.createJob);
exports.JobRouter.get('/', job_controller_1.JobController.getAllJobs);
exports.JobRouter.patch('/:id', job_controller_1.JobController.updateJob);
exports.JobRouter.delete('/:id', job_controller_1.JobController.deleteJob);
