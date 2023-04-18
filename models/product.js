import { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
        type: String,
        required: true,
      },
      image: {
        type: String,
       
      },
  },
  {
    collection: "Product",
  }
);

const Model = model("product", productSchema);

export default Model;