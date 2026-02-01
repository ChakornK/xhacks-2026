"server-only";

import Redis from "ioredis";
import "./cleanup";

const redis = new Redis(process.env.REDIS_URI);

export async function cacheData(key, fetchData, ttl) {
  const cachedData = await redis.get(key);

  if (cachedData) {
    return JSON.parse(cachedData);
  } else {
    const freshData = await fetchData();
    if (ttl) {
      await redis.set(key, JSON.stringify(freshData), "EX", ttl);
    } else {
      await redis.set(key, JSON.stringify(freshData));
    }
    return freshData;
  }
}

export const redisAdapter = {
  get: async (key) => {
    return await redis.get(key);
  },
  set: async (key, value, ttl) => {
    if (ttl) await redis.set(key, value, "EX", ttl);
    else await redis.set(key, value);
  },
  delete: async (key) => {
    await redis.del(key);
  },
};

export const disconnectRedis = () => redis.disconnect();
