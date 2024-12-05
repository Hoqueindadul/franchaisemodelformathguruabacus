import jwt from "jsonwebtoken";
import Students from "../models/student.model.js";

const createTokenAndSaveCookies = async(studentId, res) => {
    const token = jwt.sign({studentId}, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h"
    })

    res.cookie("jwt", token, {
        httpOnly:false,
        secure:true,
        sameSite:"none"
    })

    await Students.findByIdAndUpdate(studentId, {token})
    return token
}

export default createTokenAndSaveCookies