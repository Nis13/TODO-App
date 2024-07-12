import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response, Request as ExpressRequest } from "express";
import * as TaskService from "../service/task";
import { Request } from "../interface/auth";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import { GetUserQuery } from "../interface/user";
// import  {Request as ExpressRequest} from "express";

export function getAllTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const data = TaskService.getAllTasks(userId!);
    if(!data) throw(new BadRequestError("users not accessible"));
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getTaskById(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const data = TaskService.getTaskById(parseInt(id, 10), userId!);
    if (!data) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }

    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
export function getTaskByQuery(
  req: ExpressRequest<any,any,any,GetUserQuery>, res: Response) {
  const {query} = req;
  const userId = (req as Request).user?.id;
  const data = TaskService.getTaskByQuery(query,userId!);
  res.json(data)
};

export function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const task = req.body;
    if (!task || !task.title) {
      throw new BadRequestError("Task title is required");
    }
    const data = TaskService.addTask(task.title, userId!);
    res.status(HttpStatusCodes.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

export function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const { title, completed } = req.body;
    const data = TaskService.updateTask(
      parseInt(id),
      title,
      completed,
      userId!
    );
    if (!data) {
      throw new NotFoundError(`Task with ID ${id} not found`);
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const { id } = req.params;
    const deletedData = TaskService.deleteTask(parseInt(id, 10), userId!);
    if(!deletedData) throw(new BadRequestError("user doesn't exists"));
    const data = TaskService.getAllTasks(userId!);
    res.json(data);
  } catch (error) {
    next(error);
  }
}
