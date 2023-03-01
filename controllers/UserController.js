import * as UserService from '../services/userService.js';
import * as dotenv from 'dotenv';

const {HOMEPAGE} = dotenv.config().parsed;

class UserController {
  async registration (req, res, next) {
    try {

      const {email, password} = req.body;

      const userData = await UserService.registration(email, password);

      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login (req, res, next) {
    try {
      const {email, password} = req.body;
      const userData = await UserService.login(email, password);
      res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout (req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async refreshToken (req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async getAll (req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async getOne (req, res, next) {
    try {

    } catch (e) {
      next(e);
    }
  }

  async activate (req, res, next) {
    try {
      const link = req.params.id;

      await UserService.activateUser(link);

      res.redirect(HOMEPAGE);

    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();