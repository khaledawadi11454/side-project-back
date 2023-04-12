import bodyParser from "body-parser";
import express from "express";
const app = express();


import { connectDB } from "./config/db.js";

connectDB();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
import adminRouters from "./routes/admin.js";
import productRouters from "./routes/product.js";


app.use("/admin", adminRouters);
app.use("/product",productRouters);


app.listen(5000, () => {
  console.log("listening on port 5000");
});