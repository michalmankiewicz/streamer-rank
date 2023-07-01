import socket, { Server } from "socket.io";
import StreamerModel from "./models/Streamer";
import { Server as HttpServer } from "http";

export default function initializeSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  });

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
}
