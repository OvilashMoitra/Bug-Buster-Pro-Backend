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
exports.StatsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const stats_service_1 = require("./stats.service");
const createStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statInfo = req.body;
        const stats = yield stats_service_1.StatsService.createStats(statInfo);
        if (!stats) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error creating faq');
        }
        (0, sendResponse_1.sendResponse)(res, 'Stat created successfully ', stats);
    }
    catch (error) {
        next(error);
    }
});
const updatePageView = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const statsToUpdate = yield stats_service_1.StatsService.updatePageView();
        if (!statsToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error updating stats');
        }
        (0, sendResponse_1.sendResponse)(res, 'Stats updated successfully ', statsToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const getAllStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield stats_service_1.StatsService.getAllStats();
        if (!stats) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Error fetching faqs');
        }
        (0, sendResponse_1.sendResponse)(res, 'faqs fetched successfully ', stats);
    }
    catch (error) {
        next(error);
    }
});
exports.StatsController = {
    createStats,
    updatePageView,
    getAllStats,
};
