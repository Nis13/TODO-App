import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/task';
import { authenticate, authorize } from '../middleware/auth';
import { validateReqBody, validateReqQuery} from '../middleware/validator';
import { createTaskBodySchema, GetTaskQuerySchema, updateTaskBodySchema } from '../schema/task';


const router = express();

router.get('/',authenticate,authorize('get.allTasks'), getAllTasks);

// router.get("/task",authenticate, authorize('get.taskByQuery'),validateReqQuery(GetTaskQuerySchema), getTaskByQuery);

router.get("/:id",authenticate, authorize('get.taskByID'),getTaskById);

router.post("/",authenticate,authorize('post.tasks'), validateReqBody(createTaskBodySchema), createTask);

router.put("/:id",authenticate,authorize('put.updateTask'),validateReqBody(updateTaskBodySchema), updateTask);

router.delete("/:id",authenticate,authorize('delete.deleteTask'), deleteTask);


export default router;