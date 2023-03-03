import { Router } from "express";
import { router as userRouter } from "./userRouter.js";
import { router as postRouter } from "./postRouter.js";
import { router as commentRouter } from './commentRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);

export default router;

