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
exports.passwordHelpers = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../config"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(password);
    try {
        const hashedPassword = yield bcryptjs_1.default.hash(password, Number(config_1.default.bycrypt_salt_rounds));
        console.log(hashedPassword, "hashedPassword");
        return hashedPassword;
    }
    catch (err) {
        console.log(err);
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error hashing the password');
    }
});
const compareHashPassword = (givenPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isSame = yield bcryptjs_1.default.compare(givenPassword, hashedPassword);
        return isSame;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error comparing password');
    }
});
// Exclude keys from user
// Exclude keys from user
// Exclude keys from user
// Exclude keys from user
// Exclude keys from user
function exclude(user, keys) {
    const filteredEntries = Object.entries(user)
        .filter(([key]) => !keys.includes(key))
        .map(([key, value]) => [key, value]);
    return Object.fromEntries(filteredEntries);
}
exports.passwordHelpers = {
    hashPassword,
    compareHashPassword,
    exclude
};
