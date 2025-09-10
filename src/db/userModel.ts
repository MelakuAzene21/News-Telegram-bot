import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  subscribed: { type: Boolean, default: false },
});

export const User = mongoose.model("User", userSchema);
