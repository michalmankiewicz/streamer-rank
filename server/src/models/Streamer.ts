import mongoose, { Schema, Document } from "mongoose";

interface Streamer extends Document {
  nick: string;
  platform: string;
  description: string;
  votes: number;
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
      minlength: 10,
      maxlength: 500,
    },
    votes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const StreamerModel = mongoose.model<Streamer>("Streamer", StreamerSchema);

export default StreamerModel;
