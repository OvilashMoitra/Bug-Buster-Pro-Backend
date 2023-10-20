"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const job_service_1 = require("./job.service");
const createJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobInfo = req.body;
        const job = yield job_service_1.JobService.createJob(jobInfo);
        if (!job) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating job');
        }
        (0, sendResponse_1.sendResponse)(res, 'Job created successfully', job);
    }
    catch (error) {
        next(error);
    }
});
const deleteJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const jobToDelete = yield job_service_1.JobService.deleteJob(jobId);
        if (!jobToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error deleting job');
        }
        (0, sendResponse_1.sendResponse)(res, 'Job deleted successfully', jobToDelete);
    }
    catch (error) {
        next(error);
    }
});
const updateJob = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const jobInfo = req.body;
        const jobToUpdate = yield job_service_1.JobService.updateJob(jobId, jobInfo);
        if (!jobToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating job');
        }
        (0, sendResponse_1.sendResponse)(res, 'Job updated successfully', jobToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const getAllJobs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield job_service_1.JobService.getAllJobs();
        if (!jobs) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching jobs');
        }
        (0, sendResponse_1.sendResponse)(res, 'Jobs fetched successfully', jobs);
    }
    catch (error) {
        next(error);
    }
});
exports.JobController = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
};
