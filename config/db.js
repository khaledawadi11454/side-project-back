
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

mongoose.connection.on("disconnect", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connect", () => {
  console.log("mongoDB connected");
});