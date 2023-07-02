import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";

const errorHandlerMiddleware = (
  err: NotFoundError & BadRequestError & MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof MongoError && err.code === 11000) {
    {
      if (err.code === 11000) {
        return res
          .status(StatusCodes.FORBIDDEN)
          .json({ msg: "This nickname is already used" });
      }
      if (err.name === "ValidationError") {
        return res.status(StatusCodes.FORBIDDEN).json({ msg: err.message });
      }
    }
  }

  if (err.statusCode && err.message) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
