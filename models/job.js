import mongoose from "mongoose";
import { Schema, model } from "mongoose";
const jobSchema = Schema(
    {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  type: {
    type: ['part-time','full-time','freelancer'],
    required: true
  },
  urldemo: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  }
});

const Model = model("job", jobSchema);

export default Model;