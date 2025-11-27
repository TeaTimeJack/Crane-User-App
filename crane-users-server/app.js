import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import userRouter from "./routs/userRout.js";
import fillerPostsRouter from "./routs/fillerPostsRout.js";

import { dbneon } from "./config/db.js";

config();

const app = express();

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`running on ${PORT}`);
});

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://mydomain.com"],
  })
);

// const userRows = await dbneon("users");
// console.log("users", userRows);
// const licenceRows = await dbneon("licenses");
// console.log("licenses", licenceRows);
// const filler_posts = await dbneon("filler_posts");
// console.log("filler_posts", filler_posts);


app.use("/api/user", userRouter);
app.use("/api/fillerposts", fillerPostsRouter);
