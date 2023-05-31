import { Schema, model } from "mongoose";
import mongoose from "mongoose";
import userModel from "../models/user.js";
const profileSchema = Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String, 
      required:true
    },
    title: {
      type: String,
      required: true,
    },
    about: {
        type: String,
        required: true,
      }, 
      skill: {
        type: [String],
        required: true,
      }, 
      location: {
        type: String,
        required: true,
      },
      hourly_rate: {
        type: Number,
        required: true,
      },
      user: {
        type: Schema.Types.ObjectId ,
        ref: "User"
      },
  },
  {
    collection: "Profile",
  }
);
profileSchema.pre(["find", "findone"], function () {
    this.populate({path: "user" , model : userModel });
  });
  
const Model = model("profile", profileSchema);

export default Model;