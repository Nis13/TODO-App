import { query } from 'express';
import { Task } from "../interface/task";
import { GetUserQuery } from "../interface/user";
// import { GetUserQuery, User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";

const logger = loggerWithNameSpace("task Model");

export class TaskModel extends BaseModel {

  static async createTask(title:string, userId:number){
      const taskToCreate = {
         title: title,
         completed: false,
         userId: userId
      };
      await this.queryBuilder().insert(taskToCreate).table("tasks");


      const createdTask = this.queryBuilder()
      .select('id','title','completed')
      .table("tasks")
      .where("title",title)

      return createdTask;

  }

  static async updateTask(id:number, task:Task,userId:number){
      const taskToUpdate = {
          title:task.title,
          completed:task.completed,
          userId: userId,
          updatedAt: new Date(),
      };

      const query = await this.queryBuilder().update(taskToUpdate).table("tasks").where("id",id).where("userId",userId);

      if (query){
        return this.queryBuilder()
        .select('id','title','completed')
        .table("tasks")
        .where("title",task.title)
      }
  }

  static async getAllTasks(userId:number){
    const query = this.queryBuilder()
    .select({
      id: "t.id",
      title: "title",
      completed: "completed",
      username: "u.name",
    })
    .from({ t: "tasks" })
    .innerJoin({ u: "users" }, { "t.userId": "u.id" })
    .where("t.userId",userId);
    const data = await query;
    console.log(query.toString());
    return data;
  }

  static async count(filter:GetUserQuery){
      const { q } = filter;

      const query = this.queryBuilder()
      .count("*")
      .table("users")
      .first();
      
      if (q){
          query.whereLike("name",`%${q}%`);
      }

      return query;
  }


  static async getTaskById(id:number,userId:number){
      const query = this.queryBuilder().select('*').from("tasks").where("id",id).where("userId",userId).first();
      const respone = await query;
      console.log(respone);
      return respone;
  }

  static async deleteTask(id: number,userId:number) {
      await this.queryBuilder().from("tasks").where('id', id).where("userId",userId).delete();
      return { message: 'User deleted successfully' };
  }
};
