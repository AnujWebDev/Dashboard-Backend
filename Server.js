import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import { config } from "dotenv";
import userRouter from "./Routes/user.js"

const app = express();

// creating config file
config({ path: ".env" });

app.use(bodyParser.json());

// userRouter
app.use("/api", userRouter);


// DB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    dbName: "Dashboard",
  })
  .then(() => console.log("MongoDB is Connected..!"));

// Server Setup
const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));

