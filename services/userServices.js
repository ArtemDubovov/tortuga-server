import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserModal } from "../db/models/index.js"
import { ApiError } from "../excepted/ApiError.js";

const registration = async (email, password) => {
  const candidate = UserModal.findOne({where: {email}});
  
  if (candidate) {
    throw new ApiError.BadRequest(`Пользователь с почтой ${email} уже зарегистрирован.`);
  }

  const salt = await bcrypt
}