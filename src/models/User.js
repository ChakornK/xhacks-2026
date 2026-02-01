import mongoose from "mongoose";
import { storeUser, getUser } from "@/lib/redis";

const UserSchema = new mongoose.Schema({
  savedCourses: String,
  jobMatches: String,
});

UserSchema.post("save", async function (doc) {
  await storeUser(doc._id, doc);
});

UserSchema.statics.findCached = async function (id) {
  const cached = await getUser(id);
  if (cached) {
    return this.hydrate(cached);
  }
  const doc = await this.findById(id);
  if (doc) {
    await storeUser(id, doc);
  }
  return doc;
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
