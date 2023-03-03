import { Router } from "express";
import PostController from "../controllers/PostController.js";

import { registrationValidation, loginValidation } from "../validations/userValidation.js";
import validationsMiddleware from "../middlewares/validationsMiddleware.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";

export const router = new Router();

router.post('/', checkAuthMiddleware, validationsMiddleware, PostController.create);
router.get('/all', checkAuthMiddleware, validationsMiddleware, PostController.getAll);
router.put('/:id', checkAuthMiddleware, validationsMiddleware, PostController.update);
router.delete('/:id', checkAuthMiddleware, validationsMiddleware, PostController.remove);
router.get('/:id', checkAuthMiddleware, validationsMiddleware, PostController.get);
