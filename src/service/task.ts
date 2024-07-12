import { NotFoundError } from "../error/NotFoundError";
import { GetUserQuery } from "../interface/user";
import * as TaskModel from "../model/task";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("task Service");

export function getAllTasks(userID: number) {
  logger.info("get all tasks");
  const data = TaskModel.getAllTasks(userID);
  return data;
}

export function getTaskById(id: number, userId: number) {
  logger.info("get task by id");
  const data = TaskModel.getTaskById(id, userId);
  if (!data) throw(new NotFoundError("Task doesn't exists"));
  return data;
}

export function getTaskByQuery(query:GetUserQuery,userId: number){
  const data = TaskModel.getTaskByQuery(query,userId);
  if (!data) throw (new NotFoundError('Task not found'));
  return data;
}

export function addTask(title: string, userId: number) {
  logger.info("add task");
  const data = TaskModel.addTask(title, userId);
  return data;
}

export function updateTask(
  id: number,
  title: string,
  completed: boolean,
  userId: number
) {
  logger.info("update task by id");
  const task = getTaskById(id, userId);
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return TaskModel.updateTaskById(id, task, userId);
}

export function deleteTask(id: number, userId: number) {
  logger.info("delete task by id");
  const data = TaskModel.deleteTaskById(id, userId);
  if (!data) throw(new NotFoundError("task doesn't exists"));
  return data;
}
