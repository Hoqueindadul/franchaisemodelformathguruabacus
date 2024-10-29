import express from "express"
import dotenv from "dotenv"
import connectDatabase from "./connection/dbConnection.js"
import userRoute from "./routes/user.route.js"
import fileUpload from "express-fileupload"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()
dotenv.config()



const mongo_url = process.env.MONGODB_URI
const port = process.env.PORT


// middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "https://franchaisemodelformathguruabacus.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.urlencoded())
// app.use(fileUpload({
//     useTempFiles:true,
//     tempFileDir:"/tmp/"
// }))

// Define Routes
app.use("/api/users", userRoute)

connectDatabase(mongo_url)
.then(() => {
    console.log("MongoDB is Connected");
    app.listen(port, () => {
        console.log(`Server is running on: ${port}`);
    });
})
.catch(err => {
    console.error('Failed to connect to MongoDB', err);
});


