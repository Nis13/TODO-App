import HttpStatusCodes from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import * as AuthService from "../service/auth";
import { BadRequestError } from "../error/BadRequestError";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { NotFoundError } from "../error/NotFoundError";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    // if (!body.name || !body.password) {
    //   throw new BadRequestError("name and password are required");
    // }

    const data = await AuthService.login(body);

    // if (!data) {
    //   throw new UnauthenticatedError("Invalid name or password");
    // }

    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  const { body } = req;
  try {
    if (!body.refreshToken) {
      throw new BadRequestError("Refresh token is required");
    }

    const data = await AuthService.refresh(body);

    if (!data) {
      throw new NotFoundError("Refresh token not found");
    }

    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}
