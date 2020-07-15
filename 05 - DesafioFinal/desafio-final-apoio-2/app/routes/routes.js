import express from "express";
import controller from "../services/transactionService.js";

const app = express();

app.get("/", controller.findPeriod);
app.post("/create", controller.create);
app.get("/findYearBalance", controller.findYearBalance);
app.get("/findLaunchByCategoryAndYear", controller.findLaunchByCategoryAndYear);
app.get("/find", controller.find);

export { app as routes };
