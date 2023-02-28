import { Router } from "express";
import UserController from "../controllers/UserController.js";

export const router = new Router();

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/refresh', UserController.refreshToken);
router.get('/:id', UserController.getOne);
router.get('/all', UserController.getAll);
router.get('/activate/:id', UserController.activate);
