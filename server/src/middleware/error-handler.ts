import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { MongoError } from "mongodb";

const errorHandlerMiddleware = (
  err: NotFoundError | BadRequestError | Error | MongoError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  //  MongoDB unique error
  if (err instanceof MongoError && err.code === 11000) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ msg: "This nickname is already used" });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: err.message });
  }

  // Custom error
  if ("statusCode" in err) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
};

export default errorHandlerMiddleware;
