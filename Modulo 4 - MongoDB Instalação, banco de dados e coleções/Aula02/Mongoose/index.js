import mongoose from "mongoose";

const uri =
  "mongodb+srv://cicerorod:1808036901@cluster0-xumbc.mongodb.net/grades?retryWrites=true&w=majority";

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

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

// mongoose
// .connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(console.log("Conectado ao Mongo Atlas"))
// .catch((err) => console.log("Erro ao conectar ao Mongo Atlas: " + err));

//criação do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

//definindo o modelo da colecao
mongoose.model("student", studentSchema, "student");

const student = mongoose.model("student");

new student({
  name: "Cícero Jose",
  subject: "Matematica",
  type: "Trabalho Pratico",
  value: 22,
})
  .save()
  .then(() => console.log("Documento inserido"))
  .catch((err) => console.log("Erro ao inserir documento: " + err));

// mongoose.disconnect();
