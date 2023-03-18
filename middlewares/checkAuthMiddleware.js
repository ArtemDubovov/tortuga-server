import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

import { ApiError } from "../exceptions/ApiError.js";
import { checkUserId } from '../services/userService.js';

export default (req, res, next) => {
  const refreshToken = req.params.refreshToken;
  console.log(req.params);
  if (!refreshToken) {
    throw ApiError.Unauthorization('Нет доступа.', ['token']);
  }
  const tokenData = jwt.verify(refreshToken, dotenv.config().parsed.JWT_REFRESH_SECRET);
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