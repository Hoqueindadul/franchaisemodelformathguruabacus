import Courses from "../models/courses.model.js";
import mongoose from "mongoose";

export const addCourse = async (req, res) => {
  try {
    const {
      courseTitle,
      instructorName,
      courseLevel,
      courseDescription,
      shortSummary,
      pricing,
      curriculum,
      learningObjectives,
      targetedAudience,
      thumbnailUrl,
      status,
    } = req.body;

    // 1. Strict Validation Safeguards
    if (
      !courseTitle ||
      !instructorName ||
      !courseDescription ||
      !pricing?.basePrice
    ) {
      return res.status(400).json({
        message:
          "Crucial operational keys (Title, Instructor, Description, Base Price) are missing.",
      });
    }

    // 2. Automate Analytics Calculations from nested curriculum layout payload
    let totalLessonsCount = 0;
    let totalMinutes = 0;

    if (curriculum && Array.isArray(curriculum)) {
      curriculum.forEach((moduleItem) => {
        if (moduleItem.lessons && Array.isArray(moduleItem.lessons)) {
          totalLessonsCount += moduleItem.lessons.length;
          totalMinutes += moduleItem.lessons.reduce(
            (acc, current) => acc + (current.durationInMins || 0),
            0,
          );
        }
      });
    }

    // Convert total minutes to clean decimal hours formatting (e.g. 12.5 hours)
    const totalHours =
      totalMinutes > 0 ? parseFloat((totalMinutes / 60).toFixed(1)) : 0;

    // 3. Assemble normalized instance payload
    const newCourse = new Courses({
      courseTitle,
      instructorName,
      courseLevel,
      courseDescription,
      shortSummary,
      thumbnailUrl,
      status: status || "Draft",
      learningObjectives: learningObjectives || [],
      targetedAudience: targetedAudience || [],
      pricing: {
        basePrice: Number(pricing.basePrice),
        discountedPrice: Number(pricing.discountedPrice || 0),
        currency: pricing.currency || "INR",
      },
      metrics: {
        totalHours,
        totalLessonsCount,
      },
      curriculum: curriculum || [],
    });

    // 4. Double check unique slug constraint won't trigger standard error crashes
    const checkSlugExist = await Courses.findOne({ slug: newCourse.slug });
    if (checkSlugExist) {
      // Append a small random numeric salt identifier key to title path
      newCourse.slug = `${newCourse.slug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    await newCourse.save();

    return res.status(201).json({
      message: "Course initialized and saved successfully.",
      course: newCourse,
    });
  } catch (error) {
    console.error("Professional Course Addition Pipeline Failure:", error);
    return res.status(500).json({
      error: "Failed to securely write course details block.",
      technicalDetails: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid course ID format" });
    }

    const deletedCourse = await Courses.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Optional: Send back deleted course data for confirmation
    res.json({ message: "Course deleted successfully", deletedCourse });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const allCourse = async (req, res) => {
  try {
    const all_courses = await Courses.find();
    const totalCourse = all_courses.length;

    if (totalCourse === 0) {
      // If no courses found, return this message
      return res.status(404).json({ error: "No courses available." });
    }

    // If courses exist, return them
    return res.status(200).json({
      courses: all_courses,
      totalCourses: totalCourse,
      message: `All ${totalCourse} courses fetched successfully.`,
    });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({
      error: "An error occurred while fetching courses.",
      details: error.message,
    });
  }
};
