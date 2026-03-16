import express from "express";
import { createProject } from "../controllers/projectController.js";
import {verifyToken,verifyManager} from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create",verifyToken,verifyManager,createProject);
export default router;


