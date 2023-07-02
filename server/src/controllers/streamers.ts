import { StatusCodes } from "http-status-codes";
import StreamerModel from "../models/Streamer";
import { NextFunction, Request, Response } from "express";
import { CustomAPIError, NotFoundError } from "../errors";
import { Types } from "mongoose";

export const getAllStreamers = async (req: Request, res: Response) => {
  const streamers = await StreamerModel.find({}).sort({ votesDifference: -1 });
  res.status(StatusCodes.OK).json({ streamers });
};

export const getSingleStreamer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: streamerID } = req.params;

  if (!Types.ObjectId.isValid(streamerID)) {
    throw new NotFoundError(`Invalid streamer ID: ${streamerID}`);
  }

  const streamer = await StreamerModel.findOne({ _id: streamerID });
  console.log(streamer);
  if (!streamer) {
    // TODO Cast error
    console.log("INN");
    throw new NotFoundError(`No streamer with id ${streamerID}`);
  }

  res.status(StatusCodes.OK).json({ streamer });
};

// TODO Unique
export const createStreamer = async (req: Request, res: Response) => {
  const streamer = await StreamerModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ streamer });
};

export const updateStreamerVotes = async (req: Request, res: Response) => {
  const { id: streamerID } = req.params;
  const { voteType } = req.body;

  if (!Types.ObjectId.isValid(streamerID)) {
    throw new NotFoundError(`Invalid streamer ID: ${streamerID}`);
  }

  const updatedStreamer = await StreamerModel.findByIdAndUpdate(
    streamerID,
    {
      $inc: { [voteType]: 1, votesDifference: voteType === "upvotes" ? 1 : -1 },
    },
    { new: true, runValidators: true }
  );

  res.status(StatusCodes.OK).json({ updatedStreamer });
};
