import {  GetUserQuery, User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";
import { NotFoundError } from '../error/NotFoundError';
import loggerWithNameSpace from '../utilis/logger';

const logger = loggerWithNameSpace("User Service");

export function getUsers(){
    logger.info(`get all users`);
    return userModel.getUsers();
}

export function getUserById(id:number){
    logger.info(`get user by id`);
    const data = userModel.getUserById(id);
    if (!data){
        throw(new NotFoundError('user not found'));
    }
    return data;
};

export function getUserByQuery(query:GetUserQuery){
  const data = userModel.getUserByQuery(query);
  if (!data) throw (new NotFoundError('user not found'));
  return data;
}

export async function createUser(user:User){
    logger.info(`create user`);
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    return userModel.createUser(user);

}

export function getUserByEmail(email:string){
    logger.info(`get user by email`);
    const data = userModel.getUserByEmail(email);
    return data;
};

export function updateUser(id: number, updatedUser: User){
    logger.info(`update user by id`);
    const userExists = userModel.getUserById(id);
    if (!userExists) {
      throw new NotFoundError("user not found");
    }
    const data = userModel.updateUser(id, updatedUser);
    return data;
  };

  export function deleteUser(id: number) {
    logger.info(`delete user by id`);
    const userToDelete = userModel.getUserById(id);
    if (!userToDelete) {
      throw (new NotFoundError('User not found'));
    }
    return userModel.deleteUser(id);
  }