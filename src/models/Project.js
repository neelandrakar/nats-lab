import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
    },
    description: {
      type: String,
      required: [true, "Detailed description is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    services: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      required: [true, "Featured image is required"],
    },
    gallery: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
