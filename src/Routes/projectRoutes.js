import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../Controllers/Project/ProjectController.js";
// import { authenticateToken } from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.get("/",  getProjects);
router.get("/:id",  getProjectById);
router.post("/",  createProject);
router.put("/:id",  updateProject);
router.delete("/:id",  deleteProject);

export default router;
