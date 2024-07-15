import { Task } from './../../../interface/task';
import sinon from "sinon";
import expect from "expect";
import {
  getTaskById,
  getAllTasks,
  deleteTask,
  updateTask,
  addTask
} from "../../../service/task";
import * as TaskModel from "../../../model/task";

describe("Todo Service Test Suite", () => {
  describe("getTodo", () => {
    let getTodoStub: sinon.SinonStub;

    beforeEach(() => {
      getTodoStub = sinon.stub(TaskModel, "getTaskById");
    });

    afterEach(() => {
      getTodoStub.restore();
    });

    it("Should return todo list of user by id", () => {
      const todo: Task = {
        title: "Learn Node",
        completed: true,
        userId: 1,
      };

      getTodoStub.returns(todo);

      const response = getTaskById(1,1);

      expect(response).toStrictEqual(todo);
    });
  });

  describe("removeTodos", () => {
    let removeTodosStub: sinon.SinonStub;
    let todoModelgetTodosByID: sinon.SinonStub;

    beforeEach(() => {
      removeTodosStub = sinon.stub(TaskModel, "deleteTaskById");
      todoModelgetTodosByID = sinon.stub(TaskModel, "getTaskById");
    });

    afterEach(() => {
      removeTodosStub.restore();
      todoModelgetTodosByID.restore();
    });

    it("Should delete todo for user by id", () => {
      removeTodosStub.returns([]);
      todoModelgetTodosByID.returns(1);

      const response = deleteTask(1,1);

      expect(removeTodosStub.callCount).toBe(1);
      expect(removeTodosStub.getCall(0).args).toStrictEqual([1,1]);
      expect(response).toStrictEqual([]);
    });
  });

  describe("createTodos", () => {
    let createTodosStub: sinon.SinonStub;

    beforeEach(() => {
      createTodosStub = sinon.stub(TaskModel, "addTask");
    });

    afterEach(() => {
      createTodosStub.restore();
    });

    it("Should create a new todo for the user", () => {

      const userID = 1;

      createTodosStub.returns("task is added");
      const title = "task test";

      const response = addTask(title, userID);
      console.log(response);

      //   expect(createTodosStub.callCount).toBe(1);
      //   expect(createTodosStub.getCall(0).args).toStrictEqual([todoWithUserId]);
      expect(response).toStrictEqual("task is added");
    });
  });

  describe("updateTodosById", () => {
    let updateTodosStub: sinon.SinonStub;

    beforeEach(() => {
      updateTodosStub = sinon.stub(TaskModel, "updateTaskById");
    });

    afterEach(() => {
      updateTodosStub.restore();
    });

    it("Should update todo by id for the user", () => {
      const todo: Task = {
        title: "Updated Learn Node",
        completed: true,
        userId: 1,
      };
      const updatedTask = {id:1,...todo};
      updateTodosStub.returns(updatedTask);
      const userId = 1;
      const todoId = 1;
      console.log(updatedTask);
      const response = updateTask(todoId,todo.title, todo.completed, userId);
      console.log('yo response');
      console.log(response);

      expect(updateTodosStub.callCount).toBe(1);
      expect(updateTodosStub.getCall(0).args).toStrictEqual([
        todoId,
        todo.title,
        todo.completed,
        userId,
      ]);
      expect(response).toStrictEqual(updatedTask);
    });
  });
});