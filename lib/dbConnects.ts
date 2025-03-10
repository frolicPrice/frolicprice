import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI in .env.local");
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "diksha", // Replace with your actual database name
    });

    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    throw new Error("Database connection failed");
  }
};

export default dbConnect;
