import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import userModel from "../models/user.js";
const reviewSchema = Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
     ref:"User",
     required:true,
    },
    comment: {
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
    collection: "Review",
  }
);
reviewSchema.pre(["find", "findone"], function () {
    this.populate({path :"user", model : userModel});
  });
const Review = model("review", reviewSchema);

export default Review;