import mongoose from "mongoose";
const { Schema, model } = mongoose;
import userModel from "../models/user.js";
import jobModel from "../models/job.js";

const requestSchema = Schema({
  proposal: {
    type: String,
    required: true,
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

requestSchema.pre(["find", "findOne"], function () {
  this.populate({ path: "job", model: jobModel });
  this.populate({ path: "user", model: userModel });
});

const Model = model("Request", requestSchema);

export default Model;
