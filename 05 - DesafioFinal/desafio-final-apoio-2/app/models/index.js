import mongoose from "mongoose";
import TransactionModels from "./TransactionModel.js";

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.Transaction = TransactionModels(mongoose);

export { db };
