import Students from "../models/student.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import createTokenAndSaveCookies from "../jwt/authToken.js"


export const register = async (req, res) => {
    try {
        const { firstName, lastName, role, phone, email, password } = req.body;
        // console.log("Parsed Data:", { firstName, lastName, role, phone, email, password });

        // Validate input fields
        if (!firstName || !lastName || !role || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate role
        const validRoles = ['franchise', 'student'];
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

export const deleteStudents = async(req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid user ID format" });
        }

        const deletedUser = await Students.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

  



export const allUsers = async (req, res) => {
    try {
        const students = await Students.find()
        const totalStudents = students.length;
        
        res.status(200).json(students)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "An error occurred while fetching users" })
        
    }
}


// export const sendWhatsappMessage = async (req, res) => {
//     try {
//       const { program, name, phone } = req.body;
  
//       // Validate required fields
//       if (!program || !name || !phone) {
//         return res.status(400).json({ message: "Program, name, and phone number are required." });
//       }
  
//       // WhatsApp API Configuration
//       const whatsappApiUrl = "https://graph.facebook.com/v16.0/YOUR_PHONE_NUMBER_ID/messages";
//       const accessToken = "YOUR_ACCESS_TOKEN"; // Replace with your actual token
  
//       // Message Body
//       const message = `Hello ${name}, thank you for your interest in our ${program} program. We will contact you shortly!`;
  
//       // Make the API request
//       const response = await axios.post(
//         whatsappApiUrl,
//         {
//           messaging_product: "whatsapp",
//           to: `91${phone}`, // Replace 91 with the appropriate country code
//           type: "text",
//           text: { body: message },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       res.status(200).json({
//         message: "WhatsApp message sent successfully.",
//         response: response.data,
//       });
//     } catch (error) {
//       console.error("Error sending WhatsApp message:", error.message);
//       res.status(500).json({ error: "Failed to send WhatsApp message" });
//     }
//   };


export default register