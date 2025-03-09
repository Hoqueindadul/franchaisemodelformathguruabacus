import Students from "../models/student.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookies from "../jwt/authToken.js";

// ============================ REGISTER ============================
export const register = async (req, res) => {
    try {
        const { firstName, lastName, role, phone, email, password } = req.body;

        // Validate input fields
        if (!firstName || !lastName || !role || !phone || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Validate role (Updated to match frontend)
        const validRoles = ["admin", "franchise", "student"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        // Check if phone or email already exists
        const existingUser = await Students.findOne({ $or: [{ phone }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Phone or Email already registered" });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new Students({ // Check if this should be 'Users' instead
            firstName,
            lastName,
            role,
            phone,
            email,
            password: hashPassword,
        });

        await newUser.save();

        // Generate token & set cookie
        const token = await createTokenAndSaveCookies(newUser._id, res);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                firstName: newUser.firstName,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


// ============================ LOGIN ============================
export const login = async (req, res) => {
    try {
        const { role, email, password } = req.body;

        if (!role || !email || !password) {
            return res.status(400).json({ message: "Please fill in all required fields." });
        }

        // Ensure password is selected (since select: false is set in the schema)
        const student = await Students.findOne({ email }).select("+password");

        if (!student) {
            return res.status(400).json({ message: "You are not registered with this email." });
        }

        // Correct role verification
        if (student.role !== role) {
            return res.status(400).json({ message: "Your role does not match." });
        }

        // Check password
        const isMatchPassword = await bcrypt.compare(password, student.password);
        if (!isMatchPassword) {
            return res.status(400).json({ message: "Invalid password." });
        }

        // Generate token & set cookie
        const token = await createTokenAndSaveCookies(student._id, res);

        res.status(200).json({
            message: "User logged in successfully.",
            student: {
                _id: student._id,
                firstName: student.firstName,
                email: student.email,
                role: student.role,
            },
            token,
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// ============================ LOGOUT ============================
export const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        res.status(200).json({ message: "User logged out successfully." });

    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ============================ DELETE USERS ============================

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

  


// ============================ ALL USERS ============================
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