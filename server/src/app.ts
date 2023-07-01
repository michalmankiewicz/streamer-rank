import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import connectDB from "./db/connect";
import streamerRouter from "./routes/streamers";
import socket, { Server } from "socket.io";
import StreamerModel from "./models/Streamer";
import { createServer } from "http";
import initializeSocketServer from "./socket";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

app.use(express.json());
app.use("/api/v1/streamers", streamerRouter);

io.on("connection", (socket: socket.Socket) => {
  console.log("A new client connected");

  // Listen for upvote and downvote events
  socket.on("upvote", (streamerId: string) => {
    updateVoteCount(streamerId, "upvotes");
  });

  socket.on("downvote", (streamerId: string) => {
    updateVoteCount(streamerId, "downvotes");
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Helper function to update vote count and emit updates to clients
async function updateVoteCount(
  streamerId: string,
  voteType: "upvotes" | "downvotes"
) {
  try {
    const updatedStreamer = await StreamerModel.findByIdAndUpdate(
      streamerId,
      { $inc: { [voteType]: 1 } },
      { new: true }
    );

    // Emit the updated streamer to all clients
    io.emit("voteUpdate", updatedStreamer);
  } catch (err) {
    console.error(err);
  }
}

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    httpServer.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    initializeSocketServer(httpServer);
  } catch (error) {
    console.log(error);
  }
};

start();
