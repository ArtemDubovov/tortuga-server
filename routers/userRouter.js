import { Router } from "express";
import UserController from "../controllers/UserController.js";

import { registrationValidation, loginValidation } from "../validations/userValidation.js";
import validationsMiddleware from "../middlewares/validationsMiddleware.js";
import checkAuthMiddleware from "../middlewares/checkAuthMiddleware.js";

export const router = new Router();

router.post('/registration', registrationValidation, validationsMiddleware, UserController.registration);
router.post('/login', loginValidation, validationsMiddleware, UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refreshToken);
router.get('/all', checkAuthMiddleware, UserController.getAll);
router.get('/activate/:id', UserController.activate);
router.get('/one/:id', checkAuthMiddleware, UserController.getOne);
