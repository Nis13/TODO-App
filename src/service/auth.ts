import bcrypt from "bcrypt";

import { User } from "../interface/user";
import { getUserByEmail } from "./user";
import { sign, verify } from "jsonwebtoken";
import config from "../config";
import loggerWithNameSpace from "../utilis/logger";
import { BadRequestError } from "../error/BadRequestError";

const logger = loggerWithNameSpace("Auth Service");

export async function login(body: Pick<User, "email" | "password">) {
  logger.info(`login`);
  const existingUser = getUserByEmail(body.email);

  if (!existingUser) {
    throw (new BadRequestError("Invalid Email"));
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw( new BadRequestError("Invalid Password"))
  }
  
  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
  };

  const accessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpityMS,
  });
  return { accessToken, refreshToken };
}

export async function refresh(body: { refreshToken: string }) {
  logger.info(`refresh`);
  const { refreshToken } = body;

  if (!refreshToken) {
    throw (new BadRequestError('please enter the refresh token'));
  }
  const decoded = verify(refreshToken, config.jwt.secret!);
  if (typeof decoded === "string") {
    return;
  }

  const payload = {
    id: decoded.id,
    name: decoded.name,
    email: decoded.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return { accessToken: accessToken };
}
