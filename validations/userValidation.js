import { body } from 'express-validator';

export const registrationValidation = [
  body('email', 'Введен не верный формат почты.').isEmail(),
  body('password', 'Длинна пароля должна быть не менее 6 символов.').isLength({min: 6})
]

export const loginValidation = [
  body('email', 'Введен не верный формат почты.').isEmail(),
  body('password', 'Длинна пароля должна быть не менее 6 символов.').isLength({min: 6})
]

