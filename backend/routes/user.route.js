import express from "express"
import { login, logout, register, allUsers } from "../controlers/user.controler.js"
import { isAuthenticated } from "../middleware/authUser.js"


const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAuthenticated, logout)
router.get("/all-users", allUsers)

export default router