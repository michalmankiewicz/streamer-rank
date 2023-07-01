import express from "express";
import { Router } from "express";
import {
  getAllStreamers,
  createStreamer,
  getSingleStreamer,
} from "../controllers/streamers";

const router = Router();

router.route("/").post(createStreamer).get(getAllStreamers);

router.route("/:id").get(getSingleStreamer);

export default router;
