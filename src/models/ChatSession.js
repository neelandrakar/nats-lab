import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["user", "assistant", "system"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { _id: false, timestamps: true });

const chatSessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Optional because guests can chat too
  },
  messages: [messageSchema],
}, { timestamps: true });

export default mongoose.models.ChatSession || mongoose.model("ChatSession", chatSessionSchema);
