import { body } from "express-validator";

const commentUpdateValidation = [
  body('content', 'Длинна комментария должна быть не менее 3-х символов.').isLength({min: 1}),
  body('commentId', 'ID не является сгенерированным ключом.').isUUID()
];

const commentRemoveValidation = [
  body('commentId', 'ID не является сгенерированным ключом.').isUUID()
];

const commentCreateValidation = [
  body('content', 'Длинна комментария должна быть не менее 3-х символов.').isLength({min: 1}),
];

export {
  commentCreateValidation,
  commentRemoveValidation,
  commentUpdateValidation
}