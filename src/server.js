import express from "express";
import { connectDB } from "./config/db.js";
import dataRoutes from "./routes/rateLimit.route.js";
import dotenv from "dotenv";

dotenv.config({
    path:'./.env'
})
const app = express();

app.use(express.json());

app.use("/", dataRoutes);

connectDB();

app.listen(8000, () => console.log("Server running on port 8000"));
