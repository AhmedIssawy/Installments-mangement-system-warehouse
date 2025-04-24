export const getCachedData = async (key, redisClient) => {
    try {
      const data = await redisClient.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Redis GET error for key "${key}":`, error);
      return null;
    }
  };
  