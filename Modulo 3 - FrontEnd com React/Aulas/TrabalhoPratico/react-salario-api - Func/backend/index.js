const express = require("express");
const cors = require("cors");
const salarioRouter = require("./baseSalario.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/baseSalario", salarioRouter);

app.listen(4000, async () => {
  try {
    console.log(err);
  } catch (err) {}

  console.log("APi inicializada");
});
