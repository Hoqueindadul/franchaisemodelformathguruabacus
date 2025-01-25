import Franchises from "../models/franchise.model.js";
import bcrypt from "bcrypt";
import createTokenAndSaveCookiesForFranchise from "../jwt/franchiseAuthToken.js";
import jwt from "jsonwebtoken"

export const franchise_register = async (req, res) => {
    try {
        const { fullName, email, phone, address, note, password } = req.body;

        // Validate input fields
        if (!fullName || !email || !phone || !address || !note || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for duplicate franchise name (optional, based on your requirements)
        const existingFranchiseName = await Franchises.findOne({ fullName });
        if (existingFranchiseName) {
            return res.status(400).json({ message: "This franchise already exists." });
        }

        // Check for duplicate phone number
        const existingPhone = await Franchises.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({ message: "This phone number is already registered." });
        }

        // Check for duplicate email
        const existingEmail = await Franchises.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "This email is already registered." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new franchise
        const newFranchise = new Franchises({
            fullName,
            email,
            phone,
            address,
            note,
            password: hashedPassword, // Fixed the typo here
        });

        await newFranchise.save();

        // Generate token and set cookies
        try {
            const franchiseToken = await createTokenAndSaveCookiesForFranchise(newFranchise._id, email, res);
            return res.status(201).json({
                message: "Franchise registered successfully", newFranchise, franchiseToken
            });
        } catch (tokenError) {
            console.error("Token creation error:", tokenError);
            return res.status(500).json({ error: "Token creation failed" });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const franchise_login = async (req, res) => {
    const { email, password } = req.body
    try {
        if(!email || !password){
            return res.status(400).json({ message: "Please fill the required field"}) // asking for fill required field
        }

        const franchise = await Franchises.findOne({ email }).select("+password") // find the email from database

        if(!franchise){
            return res.status(400).json({ message: "Your are not registered with this email"})
        }

        const isMatchPassword = await bcrypt.compare(password, franchise.password)

        if(!isMatchPassword){
            return res.status(400).json({ message: "Your Password is wrong! Pleasse enter valid passwrod."})
        }

        const franchiseLoginToken = await createTokenAndSaveCookiesForFranchise(franchise._id, email, res)
        res.status(200).json({
            message: "Your are loggedin successfully.",
            token: franchiseLoginToken
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal serve Error. Please try again"})
        
    }
};


export const franchise_logout = async (req, res) => {
    try {
        // Extract the token from the cookie
        const franchiseToken = req.cookies.jwt;
        
        if (!franchiseToken) {
            return res.status(400).json({ message: "No user is currently logged in." });
        }

        // Decode the token to get user information
        const decoded = jwt.verify(franchiseToken, process.env.JWT_SECRET_KEY);
        
        // Clear the JWT cookie
        res.clearCookie("jwt");
        
        // response with success message
        return res.status(200).json({
            message: `User with email ${decoded.email} has logged out successfully.`,
        });
    } catch (error) {
        console.log(error);

        // Handle JWT verification errors or other unexpected issues
        if (error.name === "JsonWebTokenError") {
            return res.status(400).json({ message: "Invalid or expired token." });
        }
        
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getAll_Franchise = async(req, res) => {
    try {
        // retrive all franchises from the database
        const franchises = await Franchises.find();

        // now return the list of franchises
        return res.status(200).json({
            message: "All franchies are retrive successfully.",
            data: franchises
        })
    } catch (error) {
        console.error("Error retrieving franchises", error);
        return res.status(500).json({ message: "Internal server error. "})
        
    }
}
