import bodyParser from "body-parser";
import express from "express";
const app = express();
import cors from "cors";

import multer from "multer";
import { connectDB } from "./config/db.js";

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
import userRouters from "./routes/user.js";

import protfolioRouters from "./routes/portfolio.js";
import reviewRouters from "./routes/review.js";
import projectRouters from "./routes/project.js";
import profileRouters from "./routes/profile.js";
import jobRouters from "./routes/job.js";
import requestRouters from "./routes/request.js";
import resourceRouters from "./routes/resource.js";
import eventRouters from "./routes/event.js";
app.use("/user", userRouters);
app.use("/portfolio", protfolioRouters);
app.use("/review", reviewRouters);
app.use("/project", projectRouters);
app.use("/profile", profileRouters);
app.use("/job", jobRouters);
app.use("/request", requestRouters);
app.use("/resource", resourceRouters);
app.use("/event", eventRouters);
app.listen(5000, () => {
  console.log("listening on port 5000");
});
