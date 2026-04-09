import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true, 
    required: [true, "Username is required"], 
    trim: true,
    lowercase: true
  },

  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    lowercase: true,
     match: [/^\S+@\S+\.\S+$/, "Please use a valid email"]
  },

  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8 
  }

}, { timestamps: true });

export const User = mongoose.model("User", userSchema);