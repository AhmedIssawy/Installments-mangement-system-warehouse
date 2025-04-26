import { createClient } from "redis";

const redisClient = createClient({
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
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
