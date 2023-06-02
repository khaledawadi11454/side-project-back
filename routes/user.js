import express from "express";
import {
  deleteUser,
  editUser,
  getUserById,
  getAllUsers,
  logInUser,
  registerUser,
} from "../controllers/user.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", logInUser);
router.patch("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);

export default router;
