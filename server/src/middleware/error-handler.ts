import { BadRequestError, CustomAPIError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (
  err: NotFoundError | BadRequestError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.log(err);
  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
