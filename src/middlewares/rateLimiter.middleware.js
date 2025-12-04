import { RateLimit } from "../models/rateLimit.model.js";
const USER_LIMIT = 5;
const IP_LIMIT = 20;
const TIME_WINDOW = 60 * 1000;

export const userRateLimiter = async (req, res, next) => {
  try {
    const userId = req.headers.userid;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    //check user request per minute
    const userReq = await RateLimit.findOne({
      id: userId,
      type: "user",
    });
    const today = Date.now();
    if (userReq) {
      const timeDiff = today - userReq.lastRequestTime;

      if (timeDiff < TIME_WINDOW) {
        if (userReq.count >= USER_LIMIT) {
          return res.status(429).json({ message: "User rate limit exceeded" });
        }
        userReq.count++;
      } else {
        userReq.count = 1;
      }

      userReq.lastRequestTime = Date.now();
      await userReq.save();
    } else {
      await RateLimit.create({ id: userId, type: "user" });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const ipRateLimiter = async (req, res, next) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.ip;

    //check ip per minute
    const ipReq = await RateLimit.findOne({ id: ip, type: "ip" });
    const today = Date.now();
    if (ipReq) {
      const timeDiff = today - ipReq.lastRequestTime;

      if (timeDiff < TIME_WINDOW) {
        if (ipReq.count >= IP_LIMIT) {
          return res.status(429).json({ message: "IP rate limit exceeded" });
        }
        ipReq.count++;
      } else {
        ipReq.count = 1;
      }

      ipReq.lastRequestTime = Date.now();
      await ipReq.save();
    } else {
      await RateLimit.create({ id: ip, type: "ip" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
