import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 16); // I determined the salt is used
});

userSchema.methods.comparePassword = async function (enteredPassword, next) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Model = model("user", userSchema);

export default Model;
