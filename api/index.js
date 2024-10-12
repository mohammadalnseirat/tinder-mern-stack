import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
