import express from "express";

import {authenticate, authorize } from "../middleware/auth";
import { getUsers, getUserById, createUser } from "../controller/user";

const router = express();


router.get('/' , authenticate,authorize('admin'), getUsers);

router.get("/:id",authenticate,authorize('admin'), getUserById);

router.post('/signup',authenticate,authorize('admin'), createUser);

router.put('/:id',authenticate, authorize('admin'),(req, res) => {
    res.json({
        message: "user updated",
    })
})
router.delete('/:id',authenticate,authorize('admin'), (req, res) => {
    res.json({
        message: "user deleted",
    })
})

export default router;