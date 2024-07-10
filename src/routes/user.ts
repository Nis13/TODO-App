import express from "express";

import {auth } from "../middleware/auth";
import { getUsers, getUserById, createUser } from "../controller/user";

const router = express();


router.get('/' , auth, getUsers);

router.get("/:id", getUserById);

router.post('/signup', createUser);
router.put('/:id', (req, res) => {
    res.json({
        message: "user updated",
    })
})
router.delete('/:id', (req, res) => {
    res.json({
        message: "user deleted",
    })
})

export default router;