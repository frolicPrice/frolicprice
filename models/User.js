import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true, sparse: true } // ✅ Allows multiple `null` values
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
