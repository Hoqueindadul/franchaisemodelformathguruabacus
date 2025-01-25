import express from 'express'
import { franchise_register, franchise_login, franchise_logout, getAll_Franchise } from '../controlers/franchise.controler.js';

const router = express.Router();

router.post("/franchiseRegister", franchise_register)
router.post("/franchiseLogin", franchise_login)
router.get("/franchiseLogout", franchise_logout)
router.get("/getAllFranchises", getAll_Franchise)

export default router