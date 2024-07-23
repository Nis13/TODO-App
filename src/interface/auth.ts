import {Request as ExpressRequest } from "express";
import { GetUserQuery, User } from "./user";

export interface Request extends ExpressRequest{
    user?:User;
}
