import jwt from 'jsonwebtoken';
import { IJWTData } from '../../common/jwt.interface';

const generateJWTToken = async (
  payload: IJWTData,
  expiresIn: string,
  secretKey: string,
) => {
  const token = await jwt.sign(
    {
      data: payload,
    },
    secretKey,
    { expiresIn: expiresIn },
  );
  return token;
};

const decodeJWTToken = async (token: string, secret: string) => {
  return await jwt.verify(token, secret);
};

export const jwtHelperFunction = {
  generateJWTToken,
  decodeJWTToken,
};
