"server-only";

import Redis from "ioredis";
import "./cleanup";

export const redis = new Redis(process.env.REDIS_URI);

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

export async function storeUser(userId, data) {
  await redis.set(`user:${userId}`, JSON.stringify(data), "EX", 60 * 30);
}

export async function getUser(userId) {
  const data = await redis.get(`user:${userId}`);
  return data ? JSON.parse(data) : null;
}

export async function removeUser(userId) {
  await redis.del(`user:${userId}`);
}

export function disconnectRedis() {
  redis.disconnect();
}
