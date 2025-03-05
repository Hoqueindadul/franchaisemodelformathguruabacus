import { addBranch, getAllBranches, getBranchById, updateBranch, deleteBranch } from "../controlers/addBranch.controler.js";
import express from "express";

const router = express.Router();

router.post("/addbranch", addBranch);
router.get("/allbranches", getAllBranches);
router.get("/branch/:id", getBranchById);
router.put("/updatebranch/:id", updateBranch);
router.delete("/deletebranch/:id", deleteBranch);

export default router;
