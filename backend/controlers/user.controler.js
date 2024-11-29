import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import createTokenAndSaveCookies from "../jwt/authToken.js"
import { response } from "express";

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body
        console.log(firstName, lastName, email, password);
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "All field are rquired" })
        }

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exist with this email" })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ firstName, lastName, email, password: hashPassword })
        await newUser.save()

        if (newUser) {
            const token = await createTokenAndSaveCookies(newUser._id, res)

            res.status(201).json({ message: "User register successfully.", newUser, token: token })
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please field the required field." })
        }

        const user = await User.findOne({ email }).select("+password")
        if (!user.password) {
            return res.status(400).json({ message: "User password is missing." })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid email and password." })
        }

        const token = await createTokenAndSaveCookies(user._id, res)
        res.status(200).json({
            message: "User logged in successfully.", user: {
                _id: user._id,
                firstName: user.firstName,
                email: user.email,

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
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "An error occurred while fetching users" })
        
    }
}

export default register