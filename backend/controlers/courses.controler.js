import Courses from "../models/courses.model.js";

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
        const { courseTittle } = req.body;

        if (!courseTittle){
            return res.status(400).json({ message: "Course Name or Tittle required."})
        }

        const delete_course = await Courses.findOneAndDelete(courseTittle)

        if(!delete_course){
           return res.status(404).json({ message: "Course not found."})
        }
        
        return res.status(200).json({ message: "Course deleted successfully.", delete_course})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Faild to delete course."})
        
    }
}

export const allCourse = async (req, res) => {
    try {
        const all_courses = await Courses.find();
        const totalCourse = all_courses.length;

        if (totalCourse === 0) {
            // If no courses found, return this message
            return res.status(404).json({ message: "No courses available." });
        }

        // If courses exist, return them
        return res.status(200).json({ 
            message: `All ${totalCourse} courses fetched successfully.`,
            courses: all_courses ,
            Total_Course: totalCourse
        });
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({ message: "An error occurred while fetching courses.", error: error.message });
    }
};
