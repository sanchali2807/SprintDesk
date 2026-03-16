import express from "express";
import { approveUser } from "../controllers/authController.js";
import { verifyToken,verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.patch("/approve/:id",verifyToken,verifyAdmin,approveUser);
export default router;