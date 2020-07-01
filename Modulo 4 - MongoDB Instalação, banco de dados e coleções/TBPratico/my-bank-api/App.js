import express from "express";
import mongoose from "mongoose";
import { accountRouter } from "./routes/accountRouter.js";

const app = express();

const uri =
  "mongodb+srv://cicerorod:1808036901@cluster0-xumbc.mongodb.net/accounts?retryWrites=true&w=majority";
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
app.use("/accountRouter", accountRouter);
app.listen(3001, () => console.log("Api Iniciada"));
