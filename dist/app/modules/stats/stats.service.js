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
exports.StatsService = void 0;
const http_status_codes_1 = require("http-status-codes");
const app_1 = require("../../../app");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const createStats = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const stats = yield app_1.prisma.websiteStats.create({
        data: payload,
    });
    return stats;
});
const updatePageView = () => __awaiter(void 0, void 0, void 0, function* () {
    const statsToUpdate = yield app_1.prisma.websiteStats.update({
        data: {
            websiteVisits: { increment: 1 },
        },
        where: {
            id: config_1.default.stats_id
        },
    });
    if (!statsToUpdate) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'No stats found');
    }
    return statsToUpdate;
});
const getAllStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const stat = yield app_1.prisma.websiteStats.findMany();
    return stat;
});
exports.StatsService = {
    createStats,
    updatePageView,
    getAllStats,
};
