import { Router } from "express";
import { router as userRouter } from './userRouter.js';

const router = new Router();

router.use('/user', userRouter);

export default router;

