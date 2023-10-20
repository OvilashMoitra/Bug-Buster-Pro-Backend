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
exports.ServiceController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const service_service_1 = require("./service.service");
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceInfo = req.body;
        const service = yield service_service_1.ServiceService.createService(serviceInfo);
        if (!service) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error creating service');
        }
        (0, sendResponse_1.sendResponse)(res, 'Service have created successfully', service);
    }
    catch (error) {
        next(error);
    }
});
const getAllService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield service_service_1.ServiceService.getAllService();
        if (!services) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error fetching all services');
        }
        (0, sendResponse_1.sendResponse)(res, 'Services have fetched successfully', services);
    }
    catch (error) {
        next(error);
    }
});
const getService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const service = yield service_service_1.ServiceService.getService(id);
        if (!service) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error fetching service');
        }
        (0, sendResponse_1.sendResponse)(res, 'Service have fetched successfully', service);
    }
    catch (error) {
        next(error);
    }
});
const updateService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serviceInfo = req.body;
        const serviceToUpdate = yield service_service_1.ServiceService.updateService(serviceInfo, id);
        if (!serviceToUpdate) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error updating the service');
        }
        (0, sendResponse_1.sendResponse)(res, 'service have updated successfully', serviceToUpdate);
    }
    catch (error) {
        next(error);
    }
});
const deleteService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const serviceToDelete = yield service_service_1.ServiceService.deleteService(id);
        if (!serviceToDelete) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error deleting the service');
        }
        (0, sendResponse_1.sendResponse)(res, 'service have deleted successfully', serviceToDelete);
    }
    catch (error) {
        next(error);
    }
});
exports.ServiceController = {
    createService,
    deleteService,
    getAllService,
    updateService,
    getService
};
