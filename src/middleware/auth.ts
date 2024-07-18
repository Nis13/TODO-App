import { NextFunction, Response } from "express";
import config from "../config";
import { JwtPayload, verify } from "jsonwebtoken";
import { Request } from "../interface/auth";
import { User } from "../interface/user";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { UserModel } from "../model/user";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("unauthenticated"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret!) as User;
    req.user = user;
  } catch (error) {
    next(new UnauthenticatedError("unauthenicated"));
  }

  next();
}

export function authorize(permission: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    const userId = user.id;
    const userPermissions = await UserModel.authorizeUser(userId);
    console.log(userPermissions);
    if (!userPermissions.some(p => p.permission === permission)) {
      next(new UnauthenticatedError("Forbidden"));
    }
    next();
  };
}
