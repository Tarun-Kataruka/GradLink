import express from "express";
import cors from "cors";
import userRoutes from "../src/app/modules/users/router";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

app.use("/api/v1/users", userRoutes);

export default app;
