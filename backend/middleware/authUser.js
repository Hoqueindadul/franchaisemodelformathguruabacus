import User from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.cookies.jwt
        console.log("middleware",token);
        if(!token){
            res.status(401).json({error: "user not authorized"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.userId)
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        req.user = user
        next();
    } catch (error) {
        console.log("error occering in authentication", error)
        return res.status(401).json({error:"user not authenticated."})
    }
}