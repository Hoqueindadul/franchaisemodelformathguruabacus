import Students from "../models/student.model.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt; // Get JWT token from cookies

        if (!token) {
            return res.status(401).json({ error: "Access denied. Please log in." });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({ error: "Session expired. Please log in again." });
                }
                return res.status(401).json({ error: "Invalid token. Please log in again." });
            }
            return decoded;
        });

        // Ensure the token is valid
        if (!decoded || !decoded.studentId) {
            return res.status(401).json({ error: "Invalid token data. Please log in again." });
        }

        // Find student by ID
        const student = await Students.findById(decoded.studentId);
        if (!student) {
            return res.status(404).json({ error: "User not found. Please sign up." });
        }

        // Attach student data to request object
        req.student = student;
        next(); // Proceed to the next middleware or route handler

    } catch (error) {
        console.error("Authentication Error:", error.message);
        return res.status(500).json({ error: "Internal server error. Please try again later." });
    }
};
