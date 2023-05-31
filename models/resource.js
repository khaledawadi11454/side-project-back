import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const resourceSchema = Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
     
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"], // Minimum value allowed for rating
      max: [5, "Rating must be at most 5"], // Maximum value allowed for rating
      required: [true, "Rating is required"], // Required field with error message
    },
    
  },
  {
    collection: "Resource",
  }
);

const Resource = model("resource", resourceSchema);

export default Resource;