import express from "express";
import { getData } from "../controllers/rateLimit.controller.js";
import {
  userRateLimiter,
  ipRateLimiter,
} from "../middlewares/rateLimiter.middleware.js";

const router = express.Router();

router.get("/data",ipRateLimiter, userRateLimiter, getData);

export default router;
