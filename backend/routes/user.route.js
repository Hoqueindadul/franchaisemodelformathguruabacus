import express from "express"
import { login, logout, register, allUsers } from "../controlers/student.controler.js"
import { isAuthenticated } from "../middleware/authStudent.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)
router.get("/all-users", allUsers)

export default router