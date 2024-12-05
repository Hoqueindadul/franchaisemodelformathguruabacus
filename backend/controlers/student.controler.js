import Students from "../models/student.model.js";
import bcrypt from "bcrypt"
import createTokenAndSaveCookies from "../jwt/authToken.js"


export const register = async (req, res) => {
    try {
        const { firstName, lastName, role, phone, dateOfBirth, email, password } = req.body;
        // console.log("Parsed Data:", { firstName, lastName, role, phone, dateOfBirth, email, password });

        // Validate input fields
        if (!firstName || !lastName || !role || !phone || !dateOfBirth || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate role
        const validRoles = ['admin', 'franchise', 'student'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Validate duplicate phone number
        const studentPhone = await Students.findOne({ phone });
        if (studentPhone) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        // Check if the user already exists
        const student = await Students.findOne({ email });    
        if (student) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newStudent = new Students({ 
            firstName, 
            lastName, 
            role, 
            phone, 
            dateOfBirth, 
            email, 
            password: hashPassword 
        });
        await newStudent.save();

        // Generate token and respond
        try {
            const token = await createTokenAndSaveCookies(newStudent._id, res);
            return res.status(201).json({ message: "User registered successfully", newStudent, token });
        } catch (tokenError) {
            return res.status(500).json({ error: "Token creation failed" });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const login = async (req, res) => {
    const { role, email, password } = req.body
    try {
        if (!role || !email || !password) {
            return res.status(400).json({ message: "Please field the required field." })
        }

        const student = await Students.findOne({ email }).select("+password")
        if (!student) {
            return res.status(400).json({ message: " Your are not registered with this email." })
        }
        const studentRole = await Students.findOne({ role })
        if (!studentRole) {
            return res.status(400).json({ message: "Your are not registered with this role. "})
        }
        const isMatchPassword = await bcrypt.compare(password, student.password)
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid password." })
        }

        const token = await createTokenAndSaveCookies(student._id, res)
        res.status(200).json({
            message: "User logged in successfully.", student: {
                _id: student._id,
                firstName: student.firstName,
                email: student.email,
                role: student.role,

            }, token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        res.status(200).json({message:"User logout successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const allUsers = async (req, res) => {
    try {
        const users = await Students.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "An error occurred while fetching users" })
        
    }
}

export default register