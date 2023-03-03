import { Router } from "express";
import PostController from "../controllers/PostController.js";

import { postCreateValidation, postUpdateValidation } from "../validations/postValidation.js";
import validationsMiddleware from "../middlewares/validationsMiddleware.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";

export const router = new Router();

router.post('/', checkAuthMiddleware, postCreateValidation, validationsMiddleware, PostController.create);
router.get('/all', checkAuthMiddleware, PostController.getAll);
router.put('/:id', checkAuthMiddleware, postUpdateValidation, validationsMiddleware, PostController.update);
router.delete('/:id', checkAuthMiddleware, PostController.remove);
router.get('/:id', checkAuthMiddleware, PostController.get);
