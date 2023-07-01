import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import notFoundMiddleware from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";
import connectDB from "./db/connect";
import streamerRouter from "./routes/streamers";

dotenv.config();
const app = express();

app.use(express.json());

app.use("/api/v1/streamers", streamerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
