import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  password?: string; // Optional for Firebase social auth users
  name: string;
  role: "doctor" | "parent";
  firebaseUid?: string; // Firebase UID for social auth
  authProvider: "email" | "google" | "apple"; // Track auth provider
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: false, // Not required for social auth
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["doctor", "parent"],
      required: true,
    },
    firebaseUid: {
      type: String,
      required: false,
      unique: true,
      sparse: true, // Allow null values but ensure uniqueness when present
    },
    authProvider: {
      type: String,
      enum: ["email", "google", "apple"],
      required: true,
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);
