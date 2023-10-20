"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    stats_id: process.env.STATS_ID,
    server_url: process.env.SERVER_URL,
    database_url: process.env.DATABASE_URL,
    email_sender_host_user: process.env.EMAIL_SENDER_HOST_USER,
    resetPassword_token_expiresIn: process.env.JWT_RESET_PASSWORD_TOKEN_EXPIRES_IN,
    resetPassword_token_secret: process.env.JWT_RESET_PASSWORD_TOKEN_SECRET_KEY,
    bycrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
    },
};
