import Courses from "../models/courses.model.js";
import mongoose from "mongoose";

export const addCourse = async (req, res) => {
    try {
        const { courseTittle, instractorName, duration, price, courseLevel, courseDescription } = req.body;

        // Check for missing fields
        if (!courseTittle || !instractorName || !duration || !price || !courseLevel || !courseDescription) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate course level
        const validLevels = ['Beginner', 'Intermediate', 'Advanced'];
        if (!validLevels.includes(courseLevel)) {
            return res.status(400).json({ message: "Invalid course level. Valid levels are Beginner, Intermediate, and Advanced." });
        }

        // Validate duration format (e.g., "2h", "30min")
        const durationRegex = /^(\d+)(h|min)$/; // Matches numbers followed by 'h' or 'min'
        if (!durationRegex.test(duration)) {
            return res.status(400).json({ message: "Invalid duration format. Use '2h' or '30min'." });
        }

        // Create a new course
        const newCourse = new Courses({
            courseTittle,
            instractorName,
            duration, // Store as string (e.g., "2h" or "30min")
            price,
            courseLevel,
            courseDescription,
        });

        // Save to database
        await newCourse.save();

        res.status(200).json({ message: "Course added successfully.", newCourse });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to add course." });
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
            message: `All ${totalCourse} courses fetched successfully.`
        });
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            error: "An error occurred while fetching courses.",
            details: error.message
        });
    }
};
