import { Schema, model } from "mongoose";

const userSchema = Schema(
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
    role: {
      type: String,
      enum: ["freelancer", "customer", "WordPress Developer", "admin"],
      // required: true,
    },
  },
  {
    collection: "User",
  }
);

const Model = model("user", userSchema);

export default Model;
