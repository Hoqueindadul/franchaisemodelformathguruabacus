import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students"
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courses"
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Failed'],
        default: 'Pending'
    },
    paymentMethod: {
        type: String,
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    }
});

const Enrollments = mongoose.model("enrollments", enrollmentSchema);

export default Enrollments;
