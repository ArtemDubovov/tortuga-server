import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';

import { UserModal } from "../db/models/index.js"
import { ApiError } from "../excepted/ApiError.js";
import { UserDBO } from '../DBO/userDbo.js';

const { HASH_KEY } = Number(dotenv.config().parsed);

const registration = async (email, password) => {
  const candidate = await UserModal.findOne({where: {email}});

  if (candidate) {
    throw ApiError.BadRequest(`Пользователь с почтой ${email} уже зарегистрирован.`);
  }

  const salt = await bcrypt.genSalt(HASH_KEY);
  const passwordHash = await bcrypt.hash(password, salt);
  const activationLink = uuid.v4();

  const user = await UserModal.create({email, password: passwordHash, role: 'USER', activationLink});

  return new UserDBO(user.dataValues);
}

export {
  registration
}