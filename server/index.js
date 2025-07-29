import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoute.js";
import productRoutes from "./routes/productRoutes.js";
import emailRoutes from "./routes/emailRoute.js";
import nodemailer from "nodemailer";
//configure Env
dotenv.config();
//Mongo Connection from folder db.js
connectDb();

//restObject
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173"
  })
);
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Adjust the limit as needed
app.use(morgan("dev"));

//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/email", emailRoutes);
//PORT
const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  console.log(`Server is running on ${Port}`.bgCyan.white);
});
//restapi
app.get("/", (req, res) => {
  res.send("Hellow World!");
});
