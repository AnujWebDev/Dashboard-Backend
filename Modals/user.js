import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user","Admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  
});

module.exports = mongoose.model("User", userSchema);
