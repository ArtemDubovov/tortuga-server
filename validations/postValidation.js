import { body } from "express-validator";

const postCreateValidation = [
  body('title', 'Длинна заголовка должна быть не менее 3-х символов.').isLength({min: 3}),
  body('littleContent', 'Длинна предисловия должна быть не менее 3-х символов.').isLength({min: 3}),
  body('content', 'Длинна контента должна быть не менее 10-х символов.').isLength({min: 10}),
  body('imageTitle', 'Формат должен быть ссылкой.').optional().isURL(),
];

const postUpdateValidation = [
  body('title', 'Длинна заголовка должна быть не менее 3-х символов.').optional().isLength({min: 3}),
  body('littleContent', 'Длинна предисловия должна быть не менее 3-х символов.').optional().isLength({min: 3}),
  body('content', 'Длинна контента должна быть не менее 10-х символов.').optional().isLength({min: 10}),
  body('imageTitle', 'Формат должен быть ссылкой.').optional().isURL(),
];

export {
  postCreateValidation,
  postUpdateValidation
}