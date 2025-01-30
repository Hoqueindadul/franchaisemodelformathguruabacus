import express from "express"
import { login, logout, register, allUsers, deleteStudents } from "../controlers/student.controler.js"
import { sendWhatsappMessage } from "../controlers/bookFreeClass.js"
import { isAuthenticated } from "../middleware/authStudent.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)
router.delete("/delete/:id", deleteStudents )
router.get("/all-users", allUsers)
router.get("/sendWhatsappMessage", sendWhatsappMessage)

export default router