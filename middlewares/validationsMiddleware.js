import { validationResult } from "express-validator"
import { ApiError } from "../exceptions/ApiError.js";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw ApiError.BadRequest('Введены не верные данные.', errors.array());
  }
  next();
}