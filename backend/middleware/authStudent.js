import Students from "../models/student.model.js";
import createTokenAndSaveCookies from "../jwt/authToken.js"
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        // console.log("middleware", token);

        // Check if token exists
        if (!token) {
            return res.status(401).json({ error: "User not authorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Find the student by decoded ID
        const student = await Students.findById(decoded.studentId);
        if (!student) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach the student data to the request object for later use
        req.student = student;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log("Error occurring in authentication", error);
        return res.status(401).json({ error: "User not authenticated." });
    }
};
