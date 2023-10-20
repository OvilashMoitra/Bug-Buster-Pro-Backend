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
exports.RoleController = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const sendResponse_1 = require("../../../shared/sendResponse");
const role_service_1 = require("./role.service");
const createRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleName = req.body;
        const role = yield role_service_1.RoleService.createRole(roleName);
        if (!role) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error creating role');
        }
        (0, sendResponse_1.sendResponse)(res, 'Role have created successfully', role);
    }
    catch (error) {
        next(error);
    }
});
const getAllRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield role_service_1.RoleService.getAllRole();
        if (!roles) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error fetching all roles');
        }
        (0, sendResponse_1.sendResponse)(res, 'Roles have fetched successfully', roles);
    }
    catch (error) {
        next(error);
    }
});
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const roleName = req.body;
        const role = yield role_service_1.RoleService.updateRole(roleName, id);
        if (!role) {
            throw new ApiError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Error updating the role');
        }
        (0, sendResponse_1.sendResponse)(res, 'Role have updated successfully', role);
    }
    catch (error) {
        next(error);
    }
});
exports.RoleController = {
    createRole,
    getAllRole,
    updateRole
};
