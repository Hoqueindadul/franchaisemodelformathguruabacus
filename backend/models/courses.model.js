import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  durationInMins: { type: Number, default: 0 },
  isFreePreview: { type: Boolean, default: false },
});

const moduleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
      index: true, // Faster queries when searching by title
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    instructorName: {
      type: String,
      required: true,
      trim: true,
    },
    courseLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "All Levels"],
      default: "All Levels",
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    // Media & Presentation
    thumbnailUrl: { type: String, default: "" },
    promoVideoUrl: { type: String, default: "" },

    // Detailed Analytics Metadata
    shortSummary: { type: String, maxlengh: 160 }, // Great for SEO/Card snippets
    courseDescription: { type: String, required: true },

    // Dynamic Program Learning Targets
    learningObjectives: [{ type: String }],
    targetedAudience: [{ type: String }],

    // Cleaned Pricing Structural Schema
    pricing: {
      basePrice: { type: Number, required: true, min: 0 },
      discountedPrice: { type: Number, default: 0, min: 0 },
      currency: { type: String, default: "INR" },
    },

    // Quantifiable Metrics
    metrics: {
      totalHours: { type: Number, default: 0 },
      totalLessonsCount: { type: Number, default: 0 },
    },

    // Structured Progressive Accordion Matrix Data
    curriculum: [moduleSchema],
  },
  { timestamps: true },
);

// URL Slug generation helper run automatically before saving documents
courseSchema.pre("validate", function (next) {
  if (this.courseTitle && !this.slug) {
    this.slug = this.courseTitle
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes
  }
  next();
});

export default mongoose.models.Courses ||
  mongoose.model("Courses", courseSchema);
