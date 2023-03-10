import { body } from 'express-validator';

export const registrationValidation = [
  body('email', 'Введен не верный формат почты.').isEmail(),
  body('password', 'Длинна пароля должна быть не менее 6 символов.').isLength({min: 6}),
  body('key', 'Укажите секретный пароль для входа!').isLength({min: 1})
]

export const loginValidation = [
  body('email', 'Введен не верный формат почты.').isEmail(),
  body('password', 'Длинна пароля должна быть не менее 6 символов.').isLength({min: 6}),
  body('key', 'Укажите секретный пароль для входа!').isLength({min: 1})
]

