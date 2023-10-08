import mongoose from "mongoose";

const fileSchema = mongoose.Schema(
  {
    originalName: { type: String, required: true },
    name: { type: String, required: true },
    fileUrl: { type: String, required: true },
    shortLink: { type: String, required: true },
    userId: { type: String, required: true },
    size: { type: Number },
    format: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("File", fileSchema);
