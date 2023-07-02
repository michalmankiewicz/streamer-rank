/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose, { Schema, Document } from "mongoose";

interface Streamer {
  nick: string;
  platform: string;
  description: string;
  upvotes: number;
  downvotes: number;
  votesDifference: number;
}

const StreamerSchema: Schema<Streamer> = new Schema<Streamer>(
  {
    nick: {
      type: String,
      required: [true, "Please provide name"],
      unique: true,
      minlength: 2,
      maxlength: 20,
    },
    platform: {
      type: String,
      required: [true, "Please provide platform"],
      enum: ["Twitch", "YouTube", "TikTok", "Kick", "Rumble"],
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 3,
      maxlength: 500,
    },
    upvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
      min: 0,
    },
    votesDifference: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StreamerModel = mongoose.model<Streamer>("Streamer", StreamerSchema);

export default StreamerModel;
