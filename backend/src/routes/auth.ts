import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const router = express.Router();

// Register (supports both email/password and Firebase social auth)
router.post("/register", async (req, res) => {
  try {
    const { email, password, name, role, firebaseUid, authProvider } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, ...(firebaseUid ? [{ firebaseUid }] : [])],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword;
    if (password) {
      // Hash password for email/password registration
      const saltRounds = 12;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      role,
      firebaseUid,
      authProvider: authProvider || "email",
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login (supports both email/password and Firebase UID)
router.post("/login", async (req, res) => {
  try {
    const { email, password, firebaseUid } = req.body;

    let user;

    if (firebaseUid) {
      // Firebase authentication - find user by firebaseUid
      user = await User.findOne({ firebaseUid });
    } else {
      // Email/password authentication
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // For email/password authentication, verify password
    if (password && user.password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } else if (!firebaseUid) {
      // If no Firebase UID and no password verification, reject
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        authProvider: user.authProvider,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
