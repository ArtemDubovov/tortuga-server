import { Router } from "express";
import CommentController from "../controllers/CommentController.js";

import { commentCreateValidation, commentRemoveValidation, commentUpdateValidation } from "../validations/commentValidation.js";
import validationsMiddleware from "../middlewares/validationsMiddleware.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";

export const router = new Router();

router.post('/:id', checkAuthMiddleware, commentCreateValidation, validationsMiddleware, CommentController.create);
router.get('/post/:id', checkAuthMiddleware, CommentController.getAll);
router.put('/:id', checkAuthMiddleware, commentUpdateValidation, validationsMiddleware, CommentController.update);
router.delete('/:id', checkAuthMiddleware, commentRemoveValidation, validationsMiddleware, CommentController.remove);
router.get('/one/:id', checkAuthMiddleware, CommentController.get);
