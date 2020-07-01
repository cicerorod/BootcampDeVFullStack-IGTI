import mongoose from "mongoose";

//criação do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Valor negativo para o campo value");
      }
    },
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const studentModels = mongoose.model("student", studentSchema, "student");

export { studentModels };
