import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  savedCourses: [String],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
