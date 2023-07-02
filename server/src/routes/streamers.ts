import express from "express";
import { Router } from "express";
import {
  getAllStreamers,
  createStreamer,
  getSingleStreamer,
  updateStreamerVotes,
} from "../controllers/streamers";

const router = Router();

router.route("/").post(createStreamer).get(getAllStreamers);

router.route("/:id").get(getSingleStreamer);

router.route("/:id/vote").put(updateStreamerVotes);

export default router;
