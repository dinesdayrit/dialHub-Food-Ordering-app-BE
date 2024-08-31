import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoutes";

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connected to DB"));

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/my/user", myUserRoute);

app.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello!" });
});

app.listen(5000, () => {
  console.log("Server started on localhost:5000");
});
