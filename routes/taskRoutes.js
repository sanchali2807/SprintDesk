import express from "express";
import { createTask,getTaskByProject,updateTask,deleteTask } from "../controllers/taskController.js";
import {verifyToken,verifyManager} from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create",verifyToken,verifyManager,createTask);
router.get("/:ProjectId",verifyToken,getTaskByProject);
router.patch("/update/:id",verifyToken,updateTask);
router.delete("/delete/:id",verifyToken,deleteTask);
export default router;