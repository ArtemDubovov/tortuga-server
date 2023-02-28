import { Router } from "express";

export const router = new Router();

router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/refresh');
router.get('/');
router.get('/all');
