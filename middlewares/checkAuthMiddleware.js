import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { UserModal } from "../db/models/index.js";
import { ApiError } from "../exceptions/ApiError.js";

export default (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw ApiError.Unauthorization('Нет доступа.', []);
  }

  const tokenData = jwt.verify(token, dotenv.config().parsed.JWT_REFRESH_SECRET);


  if (!tokenData || !tokenData._id) {
    throw ApiError.Unauthorization('Нет доступа.', []);
  }

  req.userId = tokenData._id;

  next();
  
}