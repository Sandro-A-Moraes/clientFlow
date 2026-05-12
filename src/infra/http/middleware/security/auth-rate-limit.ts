import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { redisClient } from "./redis.js";

export const authRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    error: "Too many login attempts",
  },

  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});
