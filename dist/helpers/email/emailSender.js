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
exports.sendEmail = void 0;
const http_status_codes_1 = require("http-status-codes");
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../../config"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const OAuth_1 = require("../OAuth/OAuth");
const createTransporter = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ACCESS_TOKEN = yield OAuth_1.oAuth2Client.getAccessToken();
        return yield nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                type: 'OAuth2',
                user: config_1.default.email_sender_host_user,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: (ACCESS_TOKEN === null || ACCESS_TOKEN === void 0 ? void 0 : ACCESS_TOKEN.token) || '',
                // pass: config.email_sender_host_password
            },
        });
    }
    catch (err) {
        console.log("error from email sender", err);
        throw new ApiError_1.default(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, 'Error connecting nodemailer transport');
    }
});
// async..await is not allowed in global scope, must use a wrapper
function sendEmail(emailTo, subject, html) {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        const transporter = yield createTransporter();
        yield transporter.sendMail({
            from: config_1.default.email_sender_host_user,
            to: emailTo,
            subject: subject,
            text: 'Mail from Build Yourself',
            html: html, // html body
        });
    });
}
exports.sendEmail = sendEmail;
