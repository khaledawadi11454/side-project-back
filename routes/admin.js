import express from "express";
import {
  deleteAdmin,
  editAdmin,
  getAdminById,
  getAllAdmins,
  logInAdmin,
  registerAdmin,
} from "../controllers/admin.js";
const router = express.Router();

router.get("/", getAllAdmins);
router.get("/:id", getAdminById);
router.post("/register", registerAdmin);
router.post("/login", logInAdmin);
router.patch("/edit/:id", editAdmin);
router.delete("/delete/:id", deleteAdmin);

export default router;