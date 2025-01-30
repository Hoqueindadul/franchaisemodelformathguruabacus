import express from 'express'
import { addCourse, deleteCourse, allCourse } from '../controlers/courses.controler.js'

const router = express.Router()

router.post("/addCourse", addCourse)
router.delete("/deleteCourse/:id", deleteCourse)
router.get("/allCourse", allCourse)

export default router