import express from "express";
import {
  deleteUser,
  editUser,
  getUserById,
  getAllUsers,
  registerUser,
  logInUser,
} from "../controllers/user.js";
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.patch("/edit/:id", editUser);
router.delete("/delete/:id", deleteUser);
router.post("/login", logInUser);

export default router;
