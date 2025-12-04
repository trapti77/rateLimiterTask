import mongoose from "mongoose";

const rateLimitSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["user", "ip"],
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
  lastRequestTime: {
    type: Date,
    default: Date.now,
  },
});

export const RateLimit = mongoose.model("RateLimit", rateLimitSchema);
