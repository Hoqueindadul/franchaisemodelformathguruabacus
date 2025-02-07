import mongoose from "mongoose";

const coursesSchema = new mongoose.Schema(
  {
    courseTitle: { 
      type: String,
      required: true,
      trim: true,
    },
    instructorName: { 
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    courseDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Courses = mongoose.model("courses", coursesSchema);

export default Courses;
