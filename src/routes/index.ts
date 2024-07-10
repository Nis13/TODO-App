import express from "express";

import authRouter from "./auth";
import userRouter from "./user";
import taskRouter from "./task";


const router = express();

router.use("/auth", authRouter);
router.use("/users",userRouter);
router.use('/tasks', taskRouter);
export default router;