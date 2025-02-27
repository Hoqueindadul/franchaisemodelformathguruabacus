import jwt from "jsonwebtoken";

const createTokenAndSaveCookies = async (studentId, res) => {
    const token = jwt.sign({ studentId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h" // Token expires in 1 hour
    });

    res.cookie("jwt", token, {
        httpOnly: true,   
        secure: true,    
        sameSite: "none", 
        maxAge: 60 * 60 * 1000 // Cookie expires in 1 hour (milliseconds)
    });

    return token; // No need to store it in the database
};

export default createTokenAndSaveCookies;
