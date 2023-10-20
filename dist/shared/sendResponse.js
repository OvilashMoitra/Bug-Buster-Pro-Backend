"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const sendResponse = (res, message, data) => {
    res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
        success: true,
        statusCode: http_status_codes_1.StatusCodes.ACCEPTED,
        message: message,
        data: data,
    });
};
exports.sendResponse = sendResponse;
