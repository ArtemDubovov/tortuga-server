import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as uuid from 'uuid';

import * as tokenService from './tokenService.js';

import { TokenModal, UserModal } from "../db/models/index.js"
import { ApiError } from "../exceptions/ApiError.js";
import { UserDto } from '../dtos/userDto.js';
import { UserTokenDto } from './../dtos/userTokenDto.js'
import { sendMail } from './mailService.js';

const { HASH_KEY, DEFAULT_URL, PORT, KEY_SITE } = dotenv.config().parsed;

const registration = async (email, password, key) => {
  const candidate = await UserModal.findOne({where: {email}});

  if (!key || key.trim().toLowerCase() !== KEY_SITE) {
    console.log(key, key.trim().toLowerCase(), KEY_SITE);
    throw ApiError.BadRequest(`Проверьте правильность введенных данных.`);
  }

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
  const userTokenDto = new UserTokenDto(user.dataValues);
  const tokens = tokenService.getTokens(userTokenDto);

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

const login = async (email, password, key) => {
  console.log(key, KEY_SITE, key.trim().toLowerCase() === KEY_SITE);
  if (!key || key.trim().toLowerCase() !== KEY_SITE) {
    console.log(key, key.trim().toLowerCase(), KEY_SITE);
    throw ApiError.BadRequest(`Проверьте правильность введенных данных.`);
  }
  const user = await UserModal.findOne({where: {email}});
  if (!user) {
    throw ApiError.BadRequest('Проверьте правильность введенных данных.');
  }

  const isCorrectPassword = await bcrypt.compare(password, user.dataValues.password);

  if (!isCorrectPassword) {
    throw ApiError.BadRequest('Проверьте правильность введенных данных.');
  }

  if (!user.dataValues.isActivate) {
    throw ApiError.BadRequest('Аккаунт не активирован.');
  }

  const userDto = new UserDto(user.dataValues);
  const userTokenDto = new UserTokenDto(user.dataValues);
  const tokens = tokenService.getTokens(userTokenDto);

  await tokenService.saveToken(user.dataValues._id, tokens.refreshToken);

  return {
    ...userDto,
    tokens
  }

}

const logout = async (refreshToken) => {
  await tokenService.removeToken(refreshToken);
}

const getAll = async () => {
  const users = await UserModal.findAll();
  return users;
}

const getOne = async (_id) => {
  const user = await UserModal.findOne({where: {_id}});
  if (user) {
    return new UserDto(user);
  }
  return user;
}

const checkUserId = async (userId) => {
  const user = await UserModal.findOne({where: {_id: userId}});
  if (!user || !user.dataValues.isActivate) {
    throw ApiError.Unauthorization('Нет доступа.', []);
  }
}

export {
  registration,
  activateUser,
  login,
  logout,
  getAll,
  checkUserId,
  getOne
}