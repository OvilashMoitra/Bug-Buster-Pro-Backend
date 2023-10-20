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
exports.JobService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createJob = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const job = yield app_1.prisma.job.create({
        data: payload,
        include: {
            role: true,
            author: true
        },
    });
    return job;
});
const deleteJob = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const jobToDelete = yield app_1.prisma.job.delete({
        where: {
            id: id,
        },
    });
    return jobToDelete;
});
const updateJob = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const jobToUpdate = yield app_1.prisma.job.update({
        data: payload,
        where: {
            id: id,
        },
        include: {
            role: true,
            author: true,
        },
    });
    if (!jobToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No job found');
    }
    return jobToUpdate;
});
const getAllJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const jobs = yield app_1.prisma.job.findMany({
        include: {
            role: true,
            author: true,
        },
    });
    return jobs;
});
exports.JobService = {
    createJob,
    deleteJob,
    updateJob,
    getAllJobs,
};
