import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/task';
import { authenticate, authorize } from '../middleware/auth';

const router = express();

router.get('/',authenticate,authorize('admin'||'user'), getAllTasks);
router.get("/:id",authenticate, authorize('admin'||'user'),getTaskById);
router.post("/",authenticate,authorize('admin'||'user'), createTask);
router.put("/:id",authenticate,authorize('admin'||'user'), updateTask);
router.delete("/:id",authenticate,authorize('admin'||'user'), deleteTask);


export default router;