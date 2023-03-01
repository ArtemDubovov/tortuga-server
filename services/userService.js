import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';

import * as tokenService from './tokenService.js';

import { TokenModal, UserModal } from "../db/models/index.js"
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
  const activationLink = `${DEFAULT_URL}:${PORT}/api/user/activate/${activationId}`;

  await sendMail(email, activationLink);

  const user = await UserModal.create({email, password: passwordHash, role: 'USER', activationLink: activationId});

  const userDBO = new UserDBO(user.dataValues);

  const tokens = tokenService.getTokens(userDBO);

  await TokenModal.create({user: user.dataValues._id, refreshToken: tokens.refreshToken});

  return {
    ...userDBO,
    tokens
  };
}

const activateUser = async (activationLink) => {
  const user = await UserModal.findOne({where: {activationLink}});
  if (!user) {
    throw ApiError.Unauthorization('Ссылка не действительна.');
  }
  await user.update({activationLink: '', isActivate: true});
  await user.save();
}

export {
  registration,
  activateUser
}