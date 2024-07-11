import HttpStatusCodes from "http-status-codes";
import { NextFunction, query, Request, Response } from "express";
import * as UserService from "../service/user";
import { BadRequestError } from "../error/BadRequestError";
import { NotFoundError } from "../error/NotFoundError";

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = UserService.getUsers();
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
    const { password, ...newUser } = data;
    res.status(HttpStatusCodes.CREATED).json(newUser);
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

    res.status(HttpStatusCodes.OK).json({
      message: "User updated successfully",
      data: [user],
    });
  } catch (error) {
    next(new BadRequestError("user can't be updated"));
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = UserService.deleteUser(parseInt(id));
  if (!data) {
    next(new NotFoundError(`User with id ${id} not found`));
    return;
  }
  res.status(HttpStatusCodes.OK).json(data);
}
