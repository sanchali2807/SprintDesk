import express from "express";
import { createTask,getTaskByProject,updateTask,deleteTask } from "../controllers/taskController.js";
import {verifyToken,verifyManager,authorizeRole} from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create",verifyToken,authorizeRole("Manager","Admin"),createTask);
router.get("/:ProjectId",verifyToken,getTaskByProject);
router.patch("/update/:id",verifyToken,authorizeRole("Manager","Admin"),updateTask);
router.delete("/delete/:id",verifyToken,deleteTask);
export default router;