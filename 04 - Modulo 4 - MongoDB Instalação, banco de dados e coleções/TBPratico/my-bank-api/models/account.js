import mongoose from "mongoose";

//criação do modelo
const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Agência deve ser maior que 0");
      }
    },
  },

  conta: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Conta deve ser maior que 0");
      }
    },
  },

  name: {
    type: String,
    required: true,
  },

  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Balance deve ser maior que 0");
      }
    },
  },

  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const accountModels = mongoose.model("account", accountSchema, "account");

export { accountModels };
