import HttpStatusCodes from "http-status-codes";
import { NextFunction, query, Request, Response } from "express";
import * as UserService from "../service/user";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";
import { GetUserQuery } from "../interface/user";

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = UserService.getUsers();
    if (!data){
      throw(new BadRequestError("users data no accessible"));
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    if (!id) {
      throw new BadRequestError("User ID is required");
    }
    const data = UserService.getUserById(parseInt(id));
    if (!data) {
      throw new NotFoundError(`User with ID ${id} not found`);
    }
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getUserByQuery(req: Request<any,any,any,GetUserQuery>, res: Response) {
  const {query} = req;
  const data = UserService.getUserByQuery(query);
  res.json(data)
};

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    if (!body || !body.name || !body.password) {
      throw new BadRequestError("name and password are required");
    }
    const data = await UserService.createUser(body);
    res.status(HttpStatusCodes.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.params;
    const { body: updatedUser } = req;

    const user = UserService.updateUser(parseInt(userId), updatedUser);

    if (!user) throw(new BadRequestError("user can't be updated"));
    res.status(HttpStatusCodes.OK).json({
      message: "User updated successfully",
      data: [user],
    });
  } catch (error) {
    next(error);
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  try{
    const { id } = req.params;
    const data = UserService.deleteUser(parseInt(id));
    if (!data) {
      throw(new NotFoundError(`User with id ${id} not found`));
    }
    res.status(HttpStatusCodes.OK).json(data);
  }
  catch(error){
    next(error);
  }
}
