import express from "express";

import {authenticate, authorize } from "../middleware/auth";
import { getUsers, getUserById, createUser, updateUser, deleteUser, getUserByQuery } from "../controller/user";
import { validateReqBody, validateReqQuery } from "../middleware/validator";
import { createUserBodySchema, GetUserQuerySchema, updateUserBodySchema } from "../schema/user";

const router = express();

router.get('/' , authenticate,authorize('get.users'), getUsers);

router.get('/user' , authenticate,authorize('get.usersByQuery'),validateReqQuery(GetUserQuerySchema), getUserByQuery);

router.get("/:id",authenticate,authorize('get.usersById'), getUserById);

router.post('/signup',authenticate,authorize('post.createUser'),validateReqBody(createUserBodySchema), createUser);

router.put('/:id',authenticate, authorize('put.updateUser'),validateReqBody(updateUserBodySchema), updateUser);

router.delete('/:id',authenticate,authorize('delete.deleteUser'), deleteUser);

export default router;