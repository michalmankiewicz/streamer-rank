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
import cors from "cors";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use("/api/v1/streamers", streamerRouter);

io.on("connection", (socket: socket.Socket) => {
  console.log("A new client connected");

  socket.on("streamerAdded", () => {
    io.emit("streamerAdded"); // Emit event to all clients
  });

  // Listen for upvote and downvote events
  socket.on("updateStreamerVote", () => {
    io.emit("updateStreamerVote");
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    httpServer.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
