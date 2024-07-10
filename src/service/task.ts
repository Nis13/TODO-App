import { Task } from './../interface/task';
import * as TaskModel from "../model/task";

export function getAllTasks(userID:number){
    const data = TaskModel.getAllTasks(userID);
    if (!data){
        return{
            err: ` task  not found`,
        }
    }
    return data;
};

export function getTaskById(id:number,userId:number){
    const data = TaskModel.getTaskById(id,userId);
    // if (!data){
    //     return{
    //         err: `data of task id: ${id} not found`,
    //     }
    // }
    return data;
};

export function addTask(title:string, completed:boolean,userId:number){
    const data = TaskModel.addTask(title,completed,userId);
    return data;
}

export function updateTask(
    id:number,
    title:string,
    completed:boolean,
    userId:number,
){
    const task = getTaskById(id,userId);
    if (!task) return null;
    if (title !== undefined) task.title = title;
    if(completed !== undefined) task.completed = completed;
    return TaskModel.updateTaskById(id,task,userId);
}

export function deleteTask(id:number,userId:number){
    TaskModel.deleteTaskById(id,userId);
}