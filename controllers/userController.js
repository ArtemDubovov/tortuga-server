const ApiError = require('./../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket } = require('./../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class userController {
  async registration(req, res, next) {
    try {
      const { email, password, role, code } = req.body;
      if (!email || !password) {
        return next(ApiError.badRequest('Не корректный email или пароль!'));
      }
      if (code !== process.env.SECRET_PASSWORD) {
        return next(ApiError.badRequest('Не верный код!'));
      }
      const candidate = await User.findOne({ where: { email } });
      if (candidate) {
        return next(ApiError.badRequest('Пользователь с таким email уже зарегистрирован!'));
      }
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJwt(user.id, user.email, user.role);
      return res.json(token);
    } catch (e) {
      return next(ApiError.badRequest('Что то пошло не так'));
    }
  }

  async login(req, res, next) {
    try {
      const { email, password, code } = req.body;
      if (code !== process.env.SECRET_PASSWORD) {
        return next(ApiError.badRequest('Не верный код!'));
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(ApiError.internal('Пользователь не найден.'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password);
      if (!comparePassword) {
        return next(ApiError.internal('Указан не верный пароль.'));
      }
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      return next(ApiError.badRequest('Что то пошло не так'));
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (e) {
      return next(ApiError.badRequest('Что то пошло не так'));
    }
  }
}

module.exports = new userController();