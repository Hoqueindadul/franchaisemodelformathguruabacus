import mongoose, { Schema } from 'mongoose'

const coursesSchema = new mongoose.Schema({
    courseTittle: {
        type: String,
        required: true,
        trim: true,
    },
    instractorName: {
        type: String,
        required: true,
        trim: true,
    },
    duration:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    courseLevel:{
        type: String,
        enum: ["Beginner", "Intermediate", "Advance"]
    },
    courseDescription: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Courses = mongoose.model("courses", coursesSchema);

export default Courses