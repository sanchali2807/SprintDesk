import express from "express";
import { registerUser,loginUser,approveUser } from "../controllers/authController.js";
const router = express.Router();
router.post("/register",registerUser);
router.post("/login",loginUser);
router.patch("/approve/:id",approveUser);
export default router;