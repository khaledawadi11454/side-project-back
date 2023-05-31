import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteProject,
  editProject,
  getProjectById,
  getAllProjects,
  addProject,
} from "../controllers/project.js";

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", addProject);

router.patch("/edit/:id", editProject);
router.delete("/delete/:id", deleteProject);

export default router;
