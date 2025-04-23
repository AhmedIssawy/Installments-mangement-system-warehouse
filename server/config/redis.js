import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log(("Redis Client Error", err)));

export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error(("Redis connection error:", error));
    process.exit(1);
  }
};
