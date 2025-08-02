import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // Trim whitespace from the beginning and end of the string
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  phone:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  answer: {
    type: String,
    require: true,
  },
  role:{
    type: Number,
    default: 0 // false
  },
  isDemoAdmin:{
    type: Boolean,
    default: false // false for regular users, true for demo admin
  }

},{timestamps: true});

export default mongoose.model("users", userSchema);
