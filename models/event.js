import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const eventSchema = Schema(
  {
   
    title: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        required: true,
      }, 
      description: {
        type: String,
        required: true,
      }, 
      location: {
        type: String,
        required: true,
      },
      Details: {
        type: [String],
        required: true,
      },
     
  },
  {
    collection: "Event",
  }
);
const Model = model("event", eventSchema);

export default Model;