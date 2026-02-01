"server-only";

import Redis from "ioredis";

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
