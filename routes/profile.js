import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import { singleImage } from "../middelware/image.js";
import {
  deleteProfile,
  editProfile,
  getProfileById,
  getAllProfiles,
  addProfile,
} from "../controllers/profile.js";

const router = express.Router();

router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/", singleImage, addProfile);

router.patch("/edit/:id", singleImage, editProfile);
router.delete("/delete/:id", deleteProfile);

export default router;
