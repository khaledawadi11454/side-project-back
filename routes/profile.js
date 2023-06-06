import express from "express";
import { verifyToken } from "../middelware/Auth.js";
import { singleImage } from "../middelware/image.js";
import {
  deleteProfile,
  editProfile,
  getProfileById,
  getAllProfiles,
  addProfile,
  getProfileByUserID,
} from "../controllers/profile.js";

const router = express.Router();

router.get("/user/:id", getProfileByUserID);
router.get("/", getAllProfiles);
router.get("/:id", getProfileById);
router.post("/",verifyToken, addProfile);

router.patch("/edit/:id", editProfile);
router.delete("/delete/:id", deleteProfile);

export default router;
