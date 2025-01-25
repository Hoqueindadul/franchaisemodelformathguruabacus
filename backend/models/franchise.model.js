import mongoose from "mongoose";

const franchiseSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String, // Changed to String for better flexibility
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    note:{
      type: String,
      trim: true,
    },
    password: {
      type: String, // Removed `unique` constraint
      required: true,
    },
    token:{
        type: String,
    }
  },
  { timestamps: true }
);

const Franchises = mongoose.model("franchise", franchiseSchema);

export default Franchises;
