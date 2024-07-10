import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/task';
import { auth } from '../middleware/auth';

const router = express();

router.get('/',auth, getAllTasks);
router.get("/:id",auth, getTaskById);
router.post("/",auth, createTask);
router.put("/:id",auth, updateTask);
router.delete("/:id",auth, deleteTask);


export default router;