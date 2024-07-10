import { NextFunction, Request,Response } from "express";
import config from "../config";
import { JwtPayload, verify } from "jsonwebtoken";

export function auth(req:any, res:Response, next:NextFunction){
    const {authorization} = req.headers;

    if (!authorization){
        next(new Error('unauthenticated'));
        return;
    }

    const token = authorization.split(" ");

    if (token.length !== 2 || token[0] !== "Bearer"){
        next(new Error("unauthenticated"));
        return;
    } 

    try {
        const decoded = verify(token[1], config.jwt.secret!) as JwtPayload;
        req.user = { id: decoded.id }; 
        next();
    } catch (error) {
        next(new Error("unauthenticated"));
    }

    next();
};