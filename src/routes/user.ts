import express from "express";

import {authenticate, authorize } from "../middleware/auth";
import { getUsers, getUserById, createUser, updateUser, deleteUser, getUserByQuery } from "../controller/user";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { createUserBodySchema, GetUserQuerySchema, updateUserBodySchema } from "../schema/user";

const router = express();


router.get('/' , authenticate,authorize('admin'), getUsers);
router.get('/user' , authenticate,authorize('admin'),validateReqQuery(GetUserQuerySchema), getUserByQuery);

router.get("/:id",authenticate,authorize('admin'), getUserById);

router.post('/signup',authenticate,authorize('admin'),validateReqBody(createUserBodySchema), createUser);

router.put('/:id',authenticate, authorize('admin'),validateReqBody(updateUserBodySchema), updateUser);

router.delete('/:id',authenticate,authorize('admin'), deleteUser);

export default router;