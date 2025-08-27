import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./connection/dbConnection.js";
import multer from "multer"; // Import multer
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoute from "./routes/user.route.js";
import franchiseRoute from "./routes/franchise.route.js";
import courseRoute from "./routes/courses.route.js";
import otpRoute from "./routes/otp.route.js";
import enrollRoute from "./routes/courseEnrollment.route.js";
import studentAdmissionRoute from "./routes/studentAdmission.route.js";
import branchRoute from "./routes/addBranch.route.js";
import productRoute from "./routes/products.route.js"; // Ensure this is correct

const app = express();
dotenv.config();

// Load environment variables
const mongo_url = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL || "http://localhost:5173",
  process.env.FRONTEND_URL || "https://franchaisemodelformathguruabacus.vercel.app" 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("Blocked by CORS:", origin); // debug
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());



// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage (for handling file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Pass `upload` middleware where needed
app.use("/api/products", upload.array("image", 5), productRoute); // Apply multer middleware for file uploads

// Other routes
app.use("/api/users", userRoute);
app.use("/api/franchises", franchiseRoute);
app.use("/api/otpValidator", otpRoute);
app.use("/api/courses", courseRoute);
app.use("/api/enrollcourse", enrollRoute);
app.use("/api/admission", studentAdmissionRoute);
app.use("/api/branches", branchRoute);

// Connect to database and start server
connectDatabase(mongo_url)
  .then(() => {
    console.log("MongoDB is Connected");
    app.listen(port, () => {
      console.log(`Server is running on: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
