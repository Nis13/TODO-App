import { NextFunction, Response } from "express";
import { Request } from "../interface/auth";
import HttpStatusCodes from "http-status-codes";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { NotFoundError } from "../error/NotFoundError";
import { BadRequestError } from "../error/BadRequestError";
import loggerWithNameSpace from "../utils/logger";

// export function notFoundError(req:Request , res:Response){
//     return res.status(HttpStatusCodes.NOT_FOUND).json({
//         message: "Not Found",
//     })
// }

const logger = loggerWithNameSpace("ErrorHandler");

export function genericErrorHandler(error:Error,req:Request, res:Response, next:NextFunction){
    if (error.stack) {
        logger.error(error.stack);
      }
    if (error instanceof UnauthenticatedError) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({
          message: error.message,
        });
      }
      if (error instanceof BadRequestError) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          message: error.message,
        });
      }
      if (error instanceof NotFoundError) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          message: error.message,
        });
      }
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
}