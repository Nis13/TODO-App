import bcrypt from "bcrypt";

import { User } from "../interface/user";
import { getUserByEmail } from "./user";
import { sign, verify } from "jsonwebtoken";
import config from "../config";


export async function login(body:Pick<User,'email' | 'password'>){
    const existingUser = getUserByEmail(body.email);

    if(!existingUser){
        return {
            error: "invalid email or password",
        };
    }

    const isValidPassword = await bcrypt.compare(
        body.password,
        existingUser.password
    )

    if(!isValidPassword){
        return {
            error: "invalid email or password",
        };
    }

    const payload = {
        id:existingUser.id,
        name: existingUser.name,
        email:existingUser.email,
    };
    
    const accessToken = await sign(payload, config.jwt.secret!,{
        expiresIn:config.jwt.accessTokenExpiryMS,
    });

    const refreshToken = await sign(payload, config.jwt.secret!,{
        expiresIn:config.jwt.refreshTokenExpityMS,
    });
    return {accessToken, refreshToken}

}

export async function refresh(body: { refreshToken: string }) {
    const { refreshToken } = body;
  
    if (!refreshToken) {
      return {
        error: "enter refresh token",
      };
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
    return {accessToken:accessToken} ;
  }