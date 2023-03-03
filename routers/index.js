import { Router } from "express";
import { router as userRouter } from "./userRouter.js";
import { router as postRouter } from "./postRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/post', postRouter);

export default router;

