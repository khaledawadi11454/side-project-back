import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteRequest,
  editRequest,
  getRequestById,
  getAllRequests,
  addRequest,
} from "../controllers/request.js";

const router = express.Router();

router.get("/", getAllRequests);
router.get("/:id", getRequestById);
router.post("/", addRequest);

router.patch("/edit/:id", editRequest);
router.delete("/delete/:id", deleteRequest);

export default router;
