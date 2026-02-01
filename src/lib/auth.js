"server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import User from "@/models/User";
import dbConnect from "./mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    },
  },
  databaseHooks: {
    session: {
      create: {
        after: async (session) => {
          await dbConnect();
          const existingUser = await User.findById(session.userId);
          if (!existingUser) {
            await User.create({ _id: session.userId, savedCourses: [] });
          }
        },
      },
    },
  },
});
