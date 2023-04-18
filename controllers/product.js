import productModel from "../models/product.js";


// export const getAllProducts = async (req, res) => {
//   try {
//     const allProducts = await productModel.find();
//     res.status(200).json({ message: allProducts });
//   } catch (err) {
//     res.json({ error: err.message });
//   }
// };
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const allProducts = await productModel.find().skip(startIndex).limit(limit);
    const totalCount = await productModel.countDocuments();

    const pagination = {};
    if (endIndex < totalCount) {
      pagination.next = {
        page: page + 1,
        limit: limit
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit
      };
    }

    res.status(200).json({ message: allProducts, pagination });
  } catch (err) {
    res.json({ error: err.message });
  }
};


export const getProductById = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    res.status(200).json({ message: product });
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const addProduct = async (req, res, next) => {
    try {
      const newProduct = new productModel(req.body);
      await newProduct.save();
      res.status(200).json("Product has been added successfully");
    } catch (err) {
      next(err);
    }
  };


// export const addProduct = async (req, res, next) => {
//   try {
//     const newProduct = new productModel(req.body);
//     newProduct.image = req.file.path;
//     if (!req.file) {
//       return next(new Error(400, "image file not uploaded"));
//     }
    
//     await newProduct.save();
//     res.status(200).json("Product has been added successfully");
//   } catch (err) {
//     next(err);
//   }
// };





export const editProduct = async (req, res) => {
  try {
    const updateProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body},
      { new: true }
    );
    res.status(200).json(updateProduct);
  } catch (error) {
    res.json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted successfully");
  } catch (error) {
    res.json({ error: err.message });
  }
};