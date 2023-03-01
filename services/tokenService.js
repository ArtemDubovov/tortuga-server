import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../excepted/ApiError.js';

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = dotenv.config().parsed;

const getTokens = (data) => {
  const acessToken = jwt.sign({...data}, JWT_ACCESS_SECRET, {expiresIn: '1d'});
  const refreshToken = jwt.sign({...data}, JWT_REFRESH_SECRET, {expiresIn: '30d'});
  return {
    acessToken,
    refreshToken
  }
}

const checkValidateToken = (token) => {
  try {
    const isValidate = jwt.verify(token, JWT_ACCESS_SECRET);
    if (isValidate) {
      return true;
    }
    return false;
  } catch (e) {
    throw ApiError.Unauthorization('Нет прав для доступа.');
  }
}

export {
  getTokens,
  checkValidateToken
}