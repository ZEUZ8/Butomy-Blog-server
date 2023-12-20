import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
dotenv.config();


import connect from "./config/dbConfig.js";
connect()

const app = express()

app.use(express.json({ limit: "30mb", extended: true }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use(cookieParser());



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
