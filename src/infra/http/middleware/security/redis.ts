import { createClient } from "redis";

export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

await redisClient.connect();

console.log("Connected to Redis successfully");

const pong = await redisClient.ping();
console.log("Redis ping response:", pong);

