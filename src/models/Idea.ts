import mongoose from "mongoose";

// Define the schema for the Idea model
const IdeaSchema = new mongoose.Schema(
  {
    // Unique identifier for each idea
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    // Title of the idea with validation
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    // Detailed description of the idea
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
    // Number of votes received, cannot be negative
    votes: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Timestamp when the idea was created
    createdAt: {
      type: Date,
      default: Date.now,
      index: true, // Indexed for faster sorting and querying
    },
  },
  {
    timestamps: true, // Adds updatedAt field automatically
  }
);

// Export the Idea model, creating it if it doesn't exist
export default mongoose.models.Idea || mongoose.model("Idea", IdeaSchema);
