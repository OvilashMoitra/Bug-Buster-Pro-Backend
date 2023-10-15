import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const sendResponse = <T>(res: Response, message: string, data: T) => {
  res.status(StatusCodes.ACCEPTED).json({
    success: true,
    statusCode: StatusCodes.ACCEPTED,
    message: message,
    data: data,
  });
};
