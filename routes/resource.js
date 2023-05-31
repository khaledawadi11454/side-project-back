import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteResource,
  editResource,
  getResourceById,
  getAllResources,
  addResource,
} from "../controllers/resource.js";

const router = express.Router();

router.get("/", getAllResources);
router.get("/:id", getResourceById);
router.post("/", addResource);

router.patch("/edit/:id", editResource);
router.delete("/delete/:id", deleteResource);

export default router;
