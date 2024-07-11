import HttpStatusCodes from "http-status-codes";
import { NextFunction, Response } from "express";
import * as TaskService from "../service/task";
import { Request } from "../interface/auth";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";

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

export function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    const task = req.body;
    if (!task || !task.title) {
      throw new BadRequestError("Task title is required");
    }
    const data = TaskService.addTask(task.title, task.completed, userId!);
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
    if (!title) {
      throw new BadRequestError("Task title is required");
    }
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
