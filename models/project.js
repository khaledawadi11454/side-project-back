import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import userModel from "../models/user.js";
const projectSchema = Schema(
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
  },
  {
    collection: "Project",
  }
);
projectSchema.pre(["find", "findone"], function () {
    this.populate({path :"user", model : userModel});
  });
const Model = model("project", projectSchema);

export default Model;