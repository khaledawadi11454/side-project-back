import { Schema, model } from "mongoose";

const adminSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Admin",
  }
);

const Model = model("admin", adminSchema);

export default Model;