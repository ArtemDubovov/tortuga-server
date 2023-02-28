import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';

import { UserModal } from "../db/models/index.js"
import { ApiError } from "../excepted/ApiError.js";
import { UserDBO } from '../DBO/userDbo.js';
import { sendMail } from './mailService.js';

const { HASH_KEY, DEFAULT_URL, PORT } = dotenv.config().parsed;

const registration = async (email, password) => {
  const candidate = await UserModal.findOne({where: {email}});

  if (candidate) {
    throw ApiError.BadRequest(`Пользователь с почтой ${email} уже зарегистрирован.`);
  }

  const salt = await bcrypt.genSalt(+HASH_KEY);
  const passwordHash = await bcrypt.hash(password, salt);
  const activationId = uuid.v4();
  const activationLink = `${DEFAULT_URL}:${PORT}/api/activate/${activationId}`;

  await sendMail(email, activationLink);

  const user = await UserModal.create({email, password: passwordHash, role: 'USER', activationLink: activationId});



  return new UserDBO(user.dataValues);
}

export {
  registration
}