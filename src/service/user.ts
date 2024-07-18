import {  GetUserQuery, User } from "../interface/user";
import * as userModel from "../model/user";
import bcrypt from "bcrypt";
import { NotFoundError } from '../error/NotFoundError';
import loggerWithNameSpace from '../utils/logger';
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("User Service");

export function getUsers(query:GetUserQuery){
    logger.info(`get all users`);
    return userModel.UserModel.getUsers(query);
}

export async function getUserById(id:number){
    logger.info(`get user by id`);
    const data = await userModel.UserModel.getUserById(id);
    if (!data){
        throw(new NotFoundError('user not found'));
    }
    return data;
};

export function getUserByQuery(query:GetUserQuery){
  // const data = userModel.getUserByQuery(query);
  const data ='';
  if (!data) throw (new NotFoundError('user not found'));
  return data;
}

export async function createUser(user:User){
    logger.info(`create user`);
    const existingUser = await userModel.UserModel.getUserByEmail(user.email);

    if (existingUser) {
      const message = "User already exists";
      throw new BadRequestError(message);
    }

    const password = await bcrypt.hash(user.password, 10);
    user.password = password;

    return userModel.UserModel.create(user)
}

export function getUserByEmail(email:string){
    logger.info(`get user by email`);
    const data = userModel.UserModel.getUserByEmail(email);
    return data;
};

export function updateUser(id: number, updatedUser: User){
    logger.info(`update user by id`);
    const userExists = userModel.UserModel.getUserById(id);
    if (!userExists) {
      throw new NotFoundError("user not found");
    }
    const data = userModel.UserModel.update(id, updatedUser);
    return data;
  };

  export function deleteUser(id: number) {
    logger.info(`delete user by id`);
    const userToDelete = userModel.UserModel.getUserById(id);
    if (!userToDelete) {
      throw (new NotFoundError('User not found'));
    }
    return userModel.UserModel.deleteUser(id);
  }