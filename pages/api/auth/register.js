//import connectDB from "@/utils/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/mongoose";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectToDB();
    console.log("Database connected successfully");

    const { name, email, password, referralCode } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

   

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      ...(referralCode ? { referralCode } : {}) // ✅ Only include referralCode if it's not null
    });
    
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
