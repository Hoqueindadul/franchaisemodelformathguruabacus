import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./connection/dbConnection.js";
import userRoute from "./routes/user.route.js";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// Load environment variables
const mongo_url = process.env.MONGODB_URI;
const port = process.env.PORT || 5000; // Default port fallback
const localFrontendUrl = process.env.FRONTEND_URL_LOCAL || "http://localhost:5173";
const deploymentFrontendUrl = process.env.MAIN_FRONTEND_URL || "https://mathguruabacus.com/";

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: [localFrontendUrl, deploymentFrontendUrl], // Allow both local and production URLs
    credentials: true, // Allow cookies or authentication headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow necessary headers
  })
);

// end points
app.use("/api/users", userRoute);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);




// Connect to the database and start the server
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
