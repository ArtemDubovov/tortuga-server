import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';

import * as tokenService from './tokenService.js';

import { TokenModal, UserModal } from "../db/models/index.js"
import { ApiError } from "../exceptions/ApiError.js";
import { UserDto } from '../dtos/userDto.js';
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
  const userDto = new UserDto(user.dataValues);
  const tokens = tokenService.getTokens(userDto);

  await tokenService.saveToken(user.dataValues._id, tokens.refreshToken);

  return {
    ...userDto,
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

const login = async (email, password) => {
  const user = await UserModal.findOne({where: {email}});
  if (!user) {
    throw ApiError.BadRequest('Введены не верно почта или пароль.');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.dataValues.password);

  if (!isCorrectPassword) {
    throw ApiError.BadRequest('Введены не верно почта или пароль.');
  }

  if (!user.dataValues.isActivate) {
    throw ApiError.BadRequest('Аккаунт не активирован.');
  }

  const userDto = new UserDto(user.dataValues);
  const tokens = tokenService.getTokens(userDto);

  await tokenService.saveToken(user.dataValues._id, tokens.refreshToken);

  return {
    ...userDto,
    tokens
  }

}

export {
  registration,
  activateUser,
  login
}