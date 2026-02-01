"server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import User from "@/models/User";
import dbConnect from "./mongodb";
import { redisAdapter, storeUser, removeUser } from "./redis";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  secondaryStorage: redisAdapter,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      prompt: "consent",
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          await dbConnect();
          let user = await User.findCached(session.userId);
          if (!user) {
            user = await User.create({
              _id: session.userId,
              savedCourses: "[]",
              jobMatches: "{}",
            });
          }
          await storeUser(session.userId, user);
        },
      },
      update: {
        after: async (session) => {
          await dbConnect();
          const user = await User.findCached(session.userId);
          if (user) {
            await storeUser(session.userId, user);
          }
        },
      },
      delete: {
        after: async (session) => {
          await removeUser(session.userId);
        },
      },
    },
  },
});
