import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ApiError } from '../exceptions/ApiError.js';
import UserModal from '../db/models/UserModal.js';
import TokenModal from '../db/models/TokenModal.js';

const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET} = dotenv.config().parsed;

const getTokens = (data) => {
  const accessToken = jwt.sign({...data}, JWT_ACCESS_SECRET, {expiresIn: '1d'});
  const refreshToken = jwt.sign({...data}, JWT_REFRESH_SECRET, {expiresIn: '30d'});
  return {
    accessToken,
    refreshToken
  }
}

const validateAccessToken = (token) => {
  try {
    const isValidate = jwt.verify(token, JWT_ACCESS_SECRET);
    if (isValidate) {
      return true;
    }
    return false;
  } catch (e) {
    throw ApiError.Unauthorization('Нет прав для доступа.');
  }
}

const validateRefreshToken = async (token) => {
  try {
    const isValidate = jwt.verify(token, JWT_REFRESH_SECRET);
    if (isValidate) {
      return true;
    }
    const findToken = await tokenModal.findOne({where: {refreshToken: token}});
    if (findToken) {
      await findToken.destroy();
    }
    return false;
  } catch (e) {
    throw ApiError.Unauthorization('Нет прав для доступа.');
  }
}

const saveToken = async (userId, refreshToken) => {
  const user = await UserModal.findOne({_id: userId});

  if (!user) {
    throw ApiError.Unauthorization('Нет прав доступа.');
  }

  const allTokens = await TokenModal.findAll({user: userId});
  const token = await TokenModal.findOne({user: userId});

  if (!token || allTokens.length < 3) {
    await TokenModal.create({user: userId, refreshToken});
  } else {
    await token.destroy();
    await TokenModal.create({user: userId, refreshToken});
  }
}

const removeToken = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.Unauthorization('Вы уже вышли из аккаунта.');
  }
  const tokenData = await TokenModal.findOne({where: {refreshToken}});
  if (!tokenData) {
    throw ApiError.Unauthorization('Вы уже вышли из аккаунта.');
  }
  await tokenData.destroy();
}

export {
  getTokens,
  validateAccessToken,
  validateRefreshToken,
  saveToken,
  removeToken
}