import express from "express";
import {
  deleteProduct,
  editProduct,
  getProductById,
  getAllProducts,
  addProduct
} from "../controllers/product.js";
// import imageHandler from '../middelwares/imageHandler.js';
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/",addProduct);

router.patch("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);

// import multer from "multer";


// const upload = multer({ dest: "uploads/" });

// router.post("/upload", upload.single("image"), (req, res) => {
//   res.status(200).json({ filename: req.file.filename });
// });




export default router;