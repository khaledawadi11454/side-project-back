import express from "express";
import {verifyToken} from "../middelware/Auth.js";
import { singleImage } from "../middelware/image.js";
import {
  deletePortfolio,
  editPortfolio,
  getPortfolioById,
  getAllPortfolios,
  addPortfolio,
} from "../controllers/portfolio.js";

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolioById);
router.post("/", singleImage, addPortfolio);

router.patch("/edit/:id", singleImage, editPortfolio);
router.delete("/delete/:id", deletePortfolio);

export default router;
