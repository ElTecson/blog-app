import express from "express";
import { getLaunchTime } from "@/config/launchTime.js";

const router = express.Router();

router.get("/", (req, res) => {
  const now = new Date();
  const launchTime = getLaunchTime();
  const uptimeSeconds = Math.floor((now - launchTime) / 1000);
  
  res.render("index", { uptimeSeconds });
});

export default router;

