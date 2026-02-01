import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  savedCourses: String,
  jobMatches: String,
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
