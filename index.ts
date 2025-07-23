import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/configs/db";
import { itemRouter } from "./src/routes/itemRoutes";
import { authRouter } from "./src/routes/authRoutes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/items", itemRouter);
app.use("/auth", authRouter);

connectDB().then(() => {
  app.listen(8000, () => {
    console.log("Server running.");
  });
});
