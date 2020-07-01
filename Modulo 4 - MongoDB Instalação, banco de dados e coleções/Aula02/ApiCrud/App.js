import express from "express";
import mongoose from "mongoose";
import { studentRouter } from "./routes/studentRouter.js";

// const express = require("express");
// const mongoose = require("mongoose");
// const studentRouter = require("./routes/studentRouter.js");

const app = express();

const uri =
  "mongodb+srv://cicerorod:1808036901@cluster0-xumbc.mongodb.net/grades?retryWrites=true&w=majority";
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log("Erro ao conectar ao banco :" + error);
  }
})();

app.use(express.json());
app.use("/studentRouter", studentRouter);
app.listen(3000, () => console.log("Api Iniciada"));
