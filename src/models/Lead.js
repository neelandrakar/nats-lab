import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      required: [true, "Service is required"],
    },
    budget: {
      type: String,
    },
    message: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      default: "Website Form",
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL", "WON", "LOST"],
      default: "NEW",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lead || mongoose.model("Lead", LeadSchema);
