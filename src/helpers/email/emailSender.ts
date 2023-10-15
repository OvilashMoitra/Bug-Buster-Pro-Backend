import { StatusCodes } from 'http-status-codes';
import nodemailer from 'nodemailer';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import { oAuth2Client } from '../OAuth/OAuth';

const createTransporter = async () => {
  try {
    const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
    return await nodemailer.createTransport({
      service: 'gmail',

      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        type: 'OAuth2',
        user: config.email_sender_host_user,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: ACCESS_TOKEN?.token || '',
        // pass: config.email_sender_host_password
      },
    });
  } catch (err) {
    console.log("error from email sender", err);
    throw new ApiError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Error connecting nodemailer transport',
    );
  }
};

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(
  emailTo: string,
  subject: string,
  html: string,
) {
  // send mail with defined transport object
  const transporter = await createTransporter();
  await transporter.sendMail({
    from: config.email_sender_host_user, // sender address
    to: emailTo, // list of receivers
    subject: subject, // Subject line
    text: 'Mail from Build Yourself', // plain text body
    html: html, // html body
  });
}
