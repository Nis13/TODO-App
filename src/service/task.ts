import * as TaskModel from "../model/task";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("task Service");

export function getAllTasks(userID: number) {
  logger.info("get all tasks");
  const data = TaskModel.getAllTasks(userID);
  if (!data) {
    return {
      err: ` task  not found`,
    };
  }
  return data;
}

export function getTaskById(id: number, userId: number) {
  logger.info("get task by id");
  const data = TaskModel.getTaskById(id, userId);
  return data;
}

export function addTask(title: string, completed: boolean, userId: number) {
  logger.info("add task");
  const data = TaskModel.addTask(title, completed, userId);
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
  TaskModel.deleteTaskById(id, userId);
}
