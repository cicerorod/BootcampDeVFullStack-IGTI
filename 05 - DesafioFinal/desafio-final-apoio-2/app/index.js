import express from "express";
//const express = require("express");
//const cors = require("cors");
import cors from "cors";
import mongoose from "mongoose";
//const mongoose = require("mongoose");
//const routes = require("./routes/routes");
import { routes } from "./routes/routes.js";
//const path = require("path");
import path from "path";
//import * as path from "path";

//const dotenv = require("dotenv");
import dotenv from "dotenv";

import { dirname } from "path";
import { fileURLToPath } from "url";
const ____dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Faz a leitura do arquivo
 * ".env" por padrão
 */
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Vinculando o React ao app
 */
//app.use(express.static(path.join(__dirname, "client/build")));

app.use(express.static(path.join(____dirname, "client/build")));

/**
 * Rota raiz
 */
app.get("/api/", (_, response) => {
  response.send({
    message:
      "Bem-vindo à API de lançamentos. Acesse /transaction e siga as orientações",
  });
});

/**
 * Rotas principais do app
 */
app.use("/api/transaction", routes);

/**
 * Conexão ao Banco de Dados
 */
const { DB_CONNECTION } = process.env;

console.log("Iniciando conexão ao MongoDB...");
mongoose.connect(
  DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      connectedToMongoDB: false;
      console.error(`Erro na conexão ao MongoDB - ${err}`);
    }
  }
);

const { connection } = mongoose;

connection.once("open", () => {
  connectedToMongoDB: true;
  console.log("Conectado ao MongoDB");

  /**
   * Definição de porta e
   * inicialização do app
   */
  const APP_PORT = process.env.PORT || 3001;
  console.log(`Porta ${APP_PORT}`);
  console.log(path.join(____dirname, "client/build"));

  app.listen(APP_PORT, () => {
    console.log(`Servidor iniciado na porta ${APP_PORT}`);
  });
});
