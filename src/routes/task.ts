import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, getTaskByQuery, updateTask } from '../controller/task';
import { authenticate, authorize } from '../middleware/auth';
import { validateReqBody, validateReqQuery} from '../middleware/validator';
import { createTaskBodySchema, GetTaskQuerySchema, updateTaskBodySchema } from '../schema/task';


const router = express();

router.get('/',authenticate,authorize('admin'||'user'), getAllTasks);

router.get("/task",authenticate, authorize('admin'||'user'),validateReqQuery(GetTaskQuerySchema), getTaskByQuery);

router.get("/:id",authenticate, authorize('admin'||'user'),getTaskById);

router.post("/",authenticate,authorize('admin'||'user'), validateReqBody(createTaskBodySchema), createTask);

router.put("/:id",authenticate,authorize('admin'||'user'),validateReqBody(updateTaskBodySchema), updateTask);

router.delete("/:id",authenticate,authorize('admin'||'user'), deleteTask);


export default router;