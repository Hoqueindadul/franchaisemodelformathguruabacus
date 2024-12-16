import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        
    },
    role: {
        type: String,
        required: true,
        enum: ["franchise", "student"],
    },
    phone: {
        type: String,  
        required: true,
        unique: true,
        match: [/^\d{10}$/, 'phone number must be 10 digits']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password: {
        type: String,
        required: true,
    },
    token:{
        type: String,
    }
}, { timestamps: true });
const Students = mongoose.model("students", studentSchema);

export default Students;