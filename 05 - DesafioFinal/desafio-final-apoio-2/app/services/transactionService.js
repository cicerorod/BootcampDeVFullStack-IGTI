import { db } from "../models/index.js";
import { formatNumber, formatPercentage } from "../helpers/format.js";
//import { restart } from "nodemon";

const transactionModels = db.Transaction;

// Função para realizar as consultas no Banco de Dados
const funcFind = async (condition) => {
  const transaction = await db.Transaction.find(condition);

  let receita = 0;
  let despesa = 0;
  let saldo = 0;

  for (let index = 0; index < transaction.length; index++) {
    const element = transaction[index];

    if (element.type === "+") {
      receita += element.value;
    }

    if (element.type === "-") {
      despesa += element.value;
    }
  }

  saldo = receita - despesa;

  const result = {
    length: Number(transaction.length),
    receita: formatNumber(receita),
    despesa: formatNumber(despesa),
    saldo: formatNumber(saldo),
    transaction: transaction,
  };

  return result;
};

//EXEMPO DE CHAMADA PASSANDO OS DOIS PARAMETROS
//http://localhost:3001/api/transaction/?period=2019-03&description=compra
//

const findPeriod = async (req, res) => {
  try {
    const paramyearMonth = req.query.period ? req.query.period : "";
    const paramDescription = req.query.description ? req.query.description : "";

    if (!paramyearMonth) {
      res.send(
        'É necessário informar o parâmetro  "perido", cujo valor de estar no formato yyy-mm'
      );
    }

    var condition = paramyearMonth
      ? { yearMonth: { $regex: new RegExp(paramyearMonth), $options: "i" } }
      : {};

    if (paramyearMonth != "" && paramDescription != "") {
      condition = paramyearMonth
        ? {
            yearMonth: { $regex: new RegExp(paramyearMonth), $options: "i" },
            description: {
              $regex: new RegExp(paramDescription),
              $options: "i",
            },
          }
        : {};
    }

    const { length, receita, despesa, saldo, transaction } = await funcFind(
      condition
    );

    const result = {
      paramyearMonth: paramyearMonth,
      paramDescription: paramDescription,
      //condition,
      length,
      receita,
      despesa,
      saldo,
      transaction,
    };

    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

const create = async (req, res) => {
  try {
    const item = new transactionModels({
      description: req.body.description,
      value: req.body.value,
      category: req.body.category,
      year: req.body.year,
      month: req.body.month,
      day: req.body.day,
      yearMonth: req.body.yearMonth,
      yearMonthDay: req.body.yearMonthDay,
      type: req.body.type,
    });

    const data = await item.save(item);

    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Algum erro ocorreu ao salvar" });
  }
};

//
// http://localhost:3001/api/transaction/findYearBalance/?year=2021
//
const findYearBalance = async (req, res) => {
  try {
    const paramYear = req.query.year;

    if (Number(paramYear) < 0) {
      throw new Error(`Informa o Ano`);
    }

    const condition = { year: paramYear };

    const { length, receita, despesa, saldo, transaction } = await funcFind(
      condition
    );

    const result = {
      paramYear: paramYear,
      //condition,
      length,
      receita,
      despesa,
      saldo,
      transaction,
    };

    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

//
//http://localhost:3001/api/transaction/findLaunchByCategoryAndYear/?period=2021-08&category=Saúde
//

const findLaunchByCategoryAndYear = async (req, res) => {
  try {
    const paramyearMonth = req.query.period ? req.query.period : "";
    const paramCategory = req.query.category ? req.query.category : "";

    if (!paramyearMonth) {
      res.send(
        'É necessário informar o parâmetro  "perido", cujo valor de estar no formato yyy-mm'
      );
    }

    var condition = paramyearMonth
      ? {
          yearMonth: { $regex: new RegExp(paramyearMonth), $options: "i" },
          category: { $regex: new RegExp(paramCategory), $options: "i" },
        }
      : {};

    const { length, receita, despesa, saldo, transaction } = await funcFind(
      condition
    );

    const result = {
      paramyearMonth: paramyearMonth,
      paramCategory: paramCategory,
      //condition,
      length,
      receita,
      despesa,
      saldo,
      transaction,
    };

    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

//
//
//localhost:3001/api/transaction/find/?year=2020&period=2019-04&category=Saúde&description=Compras em padaria
//
http: const find = async (req, res) => {
  try {
    const paramYearMonth = req.query.period ? req.query.period : "";
    const paramCategory = req.query.category ? req.query.category : "";
    const paramDescription = req.query.description ? req.query.description : "";
    const paramYear = req.query.year ? req.query.year : "";

    var conditionParamyearMonth = paramYearMonth
      ? {
          yearMonth: { $regex: new RegExp(paramYearMonth), $options: "i" },
        }
      : null;

    var conditionParamYear = paramYear ? { year: paramYear } : null;

    var conditionParamCategory = paramCategory
      ? {
          category: { $regex: new RegExp(paramCategory), $options: "i" },
        }
      : null;

    var conditionParamDescription = paramDescription
      ? {
          description: { $regex: new RegExp(paramDescription), $options: "i" },
        }
      : null;

    let condition = [
      conditionParamyearMonth,
      conditionParamYear,
      conditionParamCategory,
      conditionParamDescription,
    ];

    var newCondition = condition.filter((item) => item !== null);

    let text = [{}];

    newCondition.forEach(function (item) {
      text.pop = item;
    });

    //var sss = JSON.stringify(Object.assign({}, newCondition));
    //const resultado = JSON.parse(newCondition.theArray);

    // var condition2 = conditionParamyearMonth
    //   ? {
    //       yearMonth: {
    //         $regex: new RegExp(conditionParamyearMonth),
    //         $options: "i",
    //       },
    //       category: {
    //         $regex: new RegExp(conditionParamCategory),
    //         $options: "i",
    //       },
    //     }
    //   : {};

    // var conditionteste = paramYearMonth
    //   ? { yearMonth: { $regex: new RegExp(paramYearMonth), $options: "i" } }
    //   : {};

    // if (paramYearMonth != "" && paramDescription != "") {
    //   conditionteste = paramYearMonth
    //     ? {
    //         yearMonth: { $regex: new RegExp(paramYearMonth), $options: "i" },
    //         description: {
    //           $regex: new RegExp(paramDescription),
    //           $options: "i",
    //         },
    //       }
    //     : {};
    // }

    const result = {
      // conditionParamyearMonth,
      // conditionParamYear,
      // conditionParamCategory,
      // conditionParamDescription,
      condition,
      newCondition,
      text,
      //condition2,
      //conditionteste,
      //sss,
      //sresultado,
      //condition2: newCond,
    };

    return res.json(result);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || "Erro ao listar todos os documentos" });
  }
};

export default {
  findPeriod,
  create,
  findYearBalance,
  findLaunchByCategoryAndYear,
  find,
};
