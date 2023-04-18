import express from "express";
import {
  deleteProduct,
  editProduct,
  getProductById,
  getAllProducts,
  addProduct
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/",addProduct);

router.patch("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

export default router;