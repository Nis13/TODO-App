import {  Response } from "express";
import * as TaskService from "../service/task";
import { Request } from '../interface/auth';

export function getAllTasks(req:Request, res:Response){
    const userId = req.user?.id;
    const data = TaskService.getAllTasks(userId!);
    res.json(data);
};

export function getTaskById(req:Request, res:Response){
    const userId = req.user?.id;
    const {id} = req.params;
    const data = TaskService.getTaskById(parseInt(id,10),userId!);
    res.json(data);
};

export function createTask(req:Request, res:Response){
    const userId = req.user?.id;
    const task = req.body;
    if (!task || !task.title) {
        res.json({error:"task's title is required"});
    }
    const data = TaskService.addTask(task.title,task.completed,userId!);
    res.json(data)
}

export function updateTask(req:Request, res:Response){
    const userId = req.user?.id;
    const id = req.params.id;
    const {title, completed} = req.body;
    
    const data = TaskService.updateTask(parseInt(id),title,completed,userId!);
    res.json(data);
}

export function deleteTask(req:Request, res:Response){
    const userId = req.user?.id;
    const id = req.params.id;
    TaskService.deleteTask(parseInt(id),userId!);
    const data = TaskService.getAllTasks(userId!);
    res.json(data);
}