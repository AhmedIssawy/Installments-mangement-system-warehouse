import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: "127.0.0.1",
  },
});

const connectRedis = async () => {
  try {
    redisClient.on("error", (err) => console.log(("Redis Client Error", err)));
    await redisClient.connect();
    console.log("Redis connected successfully");
  } catch (error) {
    console.error(("Redis connection error:", error));
    process.exit(1);
  }
};

export default connectRedis;
export { redisClient };
