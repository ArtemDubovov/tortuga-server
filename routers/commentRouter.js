import { Router } from "express";
import CommentController from "../controllers/CommentController.js";

import { registrationValidation, loginValidation } from "../validations/userValidation.js";
import validationsMiddleware from "../middlewares/validationsMiddleware.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";

export const router = new Router();

router.post('/:id', checkAuthMiddleware, validationsMiddleware, CommentController.create);
router.get('/post/:id', checkAuthMiddleware, validationsMiddleware, CommentController.getAll);
router.put('/:id', checkAuthMiddleware, validationsMiddleware, CommentController.update);
router.delete('/:id', checkAuthMiddleware, validationsMiddleware, CommentController.remove);
router.get('/one/:id', checkAuthMiddleware, validationsMiddleware, CommentController.get);
