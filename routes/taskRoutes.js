import express from "express";
import { createTask,getTaskByProject,updateTask,deleteTask } from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/create",createTask);
router.get("/:id",getTaskByProject);
router.patch("/update",updateTask);
router.delete("/delete",deleteTask);