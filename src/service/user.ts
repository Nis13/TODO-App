import { query } from 'express';
import { GetUserQuery, User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";

export function getUserById(id:number){
    const data = userModel.getUserById(id);
    if (!data){
        return{
            err: `data of user id: ${id} not found`,
        }
    }
    return data;
};

export async function createUser(user:User){
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    return userModel.createUser(user);

}

export function getUsers(query:GetUserQuery){
    return userModel.getUsers(query);
}


export function getUserByEmail(email:string){
    const data = userModel.getUserByEmail(email);
   
    return data;
};