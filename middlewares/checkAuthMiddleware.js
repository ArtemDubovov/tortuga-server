import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { ApiError } from "../exceptions/ApiError.js";

export default (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw ApiError.Unauthorization('Нет доступа.', ['token']);
  }
  const tokenData = jwt.verify(token, dotenv.config().parsed.JWT_REFRESH_SECRET);
  if (!tokenData || !tokenData._id) {
    throw ApiError.Unauthorization('Нет доступа.', ['data']);
  }

  req.userId = tokenData._id;

  next();
}