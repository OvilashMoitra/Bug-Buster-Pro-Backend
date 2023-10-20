"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oAuth2Client = void 0;
const googleapis_1 = require("googleapis");
exports.oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
exports.oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
