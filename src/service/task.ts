import { NotFoundError } from "../error/NotFoundError";
import { GetUserQuery } from "../interface/user";
import * as TaskModel from "../model/task";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("task Service");

export function getAllTasks(userID: number) {
  logger.info("get all tasks");
  return TaskModel.TaskModel.getAllTasks(userID);
}

export function getTaskById(id: number, userId: number) {
  logger.info("get task by id");
  const data = TaskModel.TaskModel.getTaskById(id, userId);
  if (!data) throw(new NotFoundError("Task doesn't exists"));
  return data;
}

// export function getTaskByQuery(query:GetUserQuery,userId: number){
//   const data = TaskModel.getTaskByQuery(query,userId);
//   if (!data) throw (new NotFoundError('Task not found'));
//   return data;
// }

export function addTask(title: string, userId: number) {
  logger.info("add task");
  return TaskModel.TaskModel.createTask(title, userId);
  
}

export async function updateTask(
  id: number,
  title: string,
  completed: boolean,
  userId: number
) {
  logger.info("update task by id");
  const task = await TaskModel.TaskModel.getTaskById(id, userId);
  if (!task) return null;
  if (title !== undefined) task.title = title;
  if (completed !== undefined) task.completed = completed;
  return TaskModel.TaskModel.updateTask(id, task, userId);
}

export function deleteTask(id: number, userId: number) {
  logger.info("delete task by id");
  const data = TaskModel.TaskModel.deleteTask(id, userId);
  if (!data) throw(new NotFoundError("task doesn't exists"));
  return data;
}
