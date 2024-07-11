import { Task } from "../interface/task";
import loggerWithNameSpace from "../utilis/logger";

const logger = loggerWithNameSpace("task Model");

const tasks = [
  {
    id: 1,
    title: "task 1 of user 1",
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: "task 1 of user 2",
    completed: false,
    userId: 2,
  },
  {
    id: 3,
    title: "task 2 of user 1",
    completed: false,
    userId: 1,
  },
  {
    id: 4,
    title: "task 2 of user 2",
    completed: false,
    userId: 2,
  },
  {
    id: 5,
    title: "task 3 of user 1",
    completed: false,
    userId: 1,
  },
];

export function getAllTasks(userId: number) {
  logger.info(`get all tasks`);
  const tasksList = tasks.filter((task) => task.userId == userId);
  return tasksList;
}
export function getTaskById(id: number, userId: number) {
  logger.info(`get task by id`);
  const tasksList = tasks.filter((task) => task.userId == userId);
  return tasksList.find(({ id: taskId }) => taskId === id);
}

export function addTask(title: string, completed: boolean, userId: number) {
  logger.info(`create task`);
  tasks.push({
    title: title,
    completed: completed,
    id: tasks[tasks.length - 1].id + 1,
    userId: userId,
  });
  return "task is added";
}

export function updateTaskById(id: number, task: Task, userId: number) {
  logger.info(`update task`);
  const taskIndex = tasks.findIndex(
    (task) => task.id === id && task.userId === userId
  );
  if (taskIndex != -1) {
    tasks[taskIndex] = { id, ...task };
    return tasks[taskIndex];
  }
}

export function deleteTaskById(id: number, userId: number) {
  logger.info(`delete task`);
  const tasksList = tasks.filter((task) => task.userId == userId);
  const taskIndex = tasksList.findIndex((task) => task.id === id);
  if (taskIndex != -1) {
    tasks.splice(taskIndex, 1);
  }
}
