import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import {
  deleteReview,
  editReview,
  getReviewById,
  getAllReviews,
  addReview,
} from "../controllers/review.js";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", addReview);

router.patch("/edit/:id", editReview);
router.delete("/delete/:id", deleteReview);

export default router;
