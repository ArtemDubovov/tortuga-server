import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { ApiError } from "../exceptions/ApiError.js";
import { checkUserId } from '../services/userService.js';

export default (req, res, next) => {
  const token = req.cookies.refreshToken;
  console.log(req.cookies);
  if (!token) {
    throw ApiError.Unauthorization('Нет доступа.', ['token']);
  }
  const tokenData = jwt.verify(token, dotenv.config().parsed.JWT_REFRESH_SECRET);
  if (!tokenData || !tokenData._id) {
    throw ApiError.Unauthorization('Нет доступа.', ['data']);
  }

  checkUserId(tokenData._id).then((res, rej) => {
    if (rej) {
      console.log(rej);
      throw ApiError.Unauthorization('Нет доступа.', ['data']);
    } else {
      next();
    }
  })

  req.userId = tokenData._id;


}