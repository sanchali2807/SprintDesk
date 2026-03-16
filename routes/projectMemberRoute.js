import { addProjectMember } from "../controllers/ProjectMemberController.js";
import express from "express";
import { verifyToken,verifyManager } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/add",verifyToken,verifyManager,addProjectMember);
export default router;
