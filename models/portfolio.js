import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import userModel from "../models/user.js";
const portfolioSchema = Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
     ref:"User",
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    image:{
        type: String,
    },
    websiteURL:{
        type: String,
    },
    githubURL:{
        type: String,
    },
    linkedinURL:{
        type: String,
    }
  }, 
  {
    collection: "Portfolio",
  }
);
portfolioSchema.pre(["find", "findone"], function () {
    this.populate({path: "user" , model:userModel});
  });
const Model = model("portfolio", portfolioSchema);

export default Model;