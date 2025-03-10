import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

// Interface to define the User model structure
export interface IUser extends Document {
  email: string;
  password: string;
  referralCode?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true, sparse: true }, // Allow multiple null values
});

// Hash password before saving it to the database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password); // Compare hashed password
};

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
