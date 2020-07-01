import express from "express";
import { accountModels } from "../models/account.js";
import e from "express";
const app = express();

//Consulta todas as contas
app.get("/account", async (_, res) => {
  try {
    const account = await accountModels.find();
    res.status(200).send(account);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//Cria uma nova conta
app.post("/Inserir", async (req, res) => {
  try {
    const paramAgencia = req.body.agencia;
    const paramConta = req.body.conta;
    const filter = { agencia: paramAgencia, conta: paramConta };

    const countAgenciaConta = await accountModels.count(filter);

    if (countAgenciaConta > 0) {
      throw new Error(
        `Agência ${paramAgencia} e conta ${paramConta} já cadastradas!`
      );
    }

    const account = new accountModels(req.body);
    await account.save();
    res.status(200).send(account);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//pesquisar por agencia e conta
app.get("/saldo/:agencia/:conta", async (req, res) => {
  try {
    const paramAgencia = req.params.agencia;
    const paramConta = req.params.conta;

    const docs = await accountModels.find({
      agencia: paramAgencia,
      conta: paramConta,
    });

    if (docs.length === 0) {
      throw new Error(
        `Agência ${paramAgencia} e conta ${paramConta} não encontrados`
      );
    }

    res.status(200).send(docs);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//realiza um deposito
app.patch("/deposito/:agencia/:conta/:balance", async (req, res) => {
  try {
    const paramAgencia = req.params.agencia;
    const paramConta = req.params.conta;
    const paramBalance = req.params.balance;

    if (Number(paramBalance) < 0) {
      //res.status(404).send(`O valor de deposito deve ser maior que 0 `);
      throw new Error(`O valor de deposito deve ser maior que 0`);
    }

    const filter = { agencia: paramAgencia, conta: paramConta };

    let doc = await accountModels.findOne(filter);

    if (!doc) {
      throw new Error(
        `Agência ${paramAgencia} e conta ${paramConta} não encontrados`
      );
    }

    doc.balance += Number(paramBalance);
    await doc.save();

    res.status(200).send(doc);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//realiza um saque
app.patch("/saque/:agencia/:conta/:balance", async (req, res) => {
  try {
    const paramAgencia = req.params.agencia;
    const paramConta = req.params.conta;
    const paramBalance = req.params.balance;
    const tarifa = 1;

    if (Number(paramBalance) < 0) {
      throw new Error(`O valor do saque deve ser maior que 0`);
    }

    const filter = { agencia: paramAgencia, conta: paramConta };

    let doc = await accountModels.findOne(filter);

    if (!doc) {
      //res.status(404).send(`Agência ${paramAgencia} e conta ${paramConta} não encontrados`);
      throw new Error(
        `Agência ${paramAgencia} e conta ${paramConta} não encontrados`
      );
    }

    const novoSaldo = doc.balance - Number(paramBalance) - Number(tarifa);

    if (novoSaldo < 0) {
      throw new Error(
        `Saldo Atual: R$ ${doc.balance} . Valor Saque: R$ ${paramBalance} . Tarifa  R$ ${tarifa}. A conta não pode ficar negativa!`
      );
    }

    doc.balance = novoSaldo;

    await doc.save();

    res.status(200).send(doc);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//deleta uma conta

app.delete("/deletar/:agencia/:conta", async (req, res) => {
  try {
    const paramAgencia = req.params.agencia;
    const paramConta = req.params.conta;
    const filter = { agencia: paramAgencia, conta: paramConta };

    const countAgenciaConta = await accountModels.count(filter);

    if (countAgenciaConta <= 0) {
      throw new Error(
        `Agência ${paramAgencia} e conta ${paramConta} não encontrados`
      );
    }

    const account = await accountModels.findOneAndDelete(filter);

    if (!account) {
      throw new Error(
        `Erro ao excluir Agência ${paramAgencia} e conta ${paramConta}`
      );
    }

    const countAgencia = await accountModels.count({ agencia: paramAgencia });

    res
      .status(200)
      .send(
        `Agência ${paramAgencia} e conta ${paramConta} excluidas. <br>TOTAL DE CONTAS ATIVAS: ${countAgencia}`
      );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//realiza um saque
app.patch(
  "/transferencia/:agenciaOrigem/:contaOrigem/:balance/:agenciaDestino/:contaDestino/",
  async (req, res) => {
    try {
      const paramAgenciaOrigem = req.params.agenciaOrigem;
      const paramContaOrigem = req.params.contaOrigem;

      const paramAgenciaDestino = req.params.agenciaDestino;
      const paramContaDestino = req.params.contaDestino;
      const paramBalance = req.params.balance;

      let paramTarifa = 8;

      if (Number(paramBalance) < 0) {
        //res.status(404).send(`O valor do saque deve ser maior que 0`);
        throw new Error(`O valor do deposito deve ser maior que R$ 0`);
      }

      const filterAgenciaOrigem = {
        agencia: paramAgenciaOrigem,
        conta: paramContaOrigem,
      };
      const filterAgenciaDestino = {
        agencia: paramAgenciaDestino,
        conta: paramContaDestino,
      };

      let agenciaOrigem = await accountModels.findOne(filterAgenciaOrigem);
      let agenciaDestino = await accountModels.findOne(filterAgenciaDestino);

      if (!agenciaOrigem) {
        throw new Error(
          `Agência ${paramAgenciaOrigem} e conta ${paramContaOrigem} não encontradas`
        );
      }

      if (!agenciaDestino) {
        throw new Error(
          `Agência ${paramAgenciaDestino} e conta ${paramContaDestino} não encontradas`
        );
      }

      paramTarifa =
        Number(paramAgenciaOrigem) !== Number(paramAgenciaDestino)
          ? paramTarifa
          : 0;

      const novoSaldoAgenciaOrigem =
        Number(agenciaOrigem.balance) -
        Number(paramBalance) -
        Number(paramTarifa);

      if (novoSaldoAgenciaOrigem < 0) {
        throw new Error(
          `Saldo Atual da conta de origem: R$ ${agenciaOrigem.balance} . Valor da transferencia: R$ ${paramBalance} . Tarifa  R$ ${paramTarifa}. A conta não pode ficar negativa!`
        );
      }

      agenciaOrigem.balance = novoSaldoAgenciaOrigem;
      await agenciaOrigem.save();

      agenciaDestino.balance += Number(paramBalance);
      agenciaDestino.save();

      res.status(200).send(agenciaOrigem);
    } catch (error) {
      res.status(404).send({ error: error.message });
    }
  }
);

//pesquisar por agencia e conta
app.get("/mediasaldoagencia/:agencia", async (req, res) => {
  try {
    const paramAgencia = req.params.agencia;
    const filter = { agencia: paramAgencia };

    const docs = await accountModels.find(filter);

    if (docs.length === 0) {
      throw new Error(` Contas da Agência ${paramAgencia} não encontradas`);
    }

    const media = await accountModels.aggregate([
      { $match: { agencia: Number(paramAgencia) } },
      { $group: { _id: "balance", media: { $avg: "$balance" } } },
    ]);

    //aggregate([{$match:{agencia:paramAgencia}},{$group:{_id:"balance",media:{$avg:"$balance"}}}]);
    //aggregate([{$match:{agencia:999         }},{$group:{_id:"balance",media:{$avg:"$balance"}}}])

    res
      .status(200)
      .send(`Balance médio da agência: ${paramAgencia} é: ${media[0].media}`);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//pesquisar clientes com menor saldo na conta
app.get("/clientesmenorsaldoemconta/:limite", async (req, res) => {
  try {
    const paramLimite = req.params.limite;

    const docs = await accountModels
      .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
      .sort({ balance: 1 })
      .limit(Number(paramLimite));

    if (docs.length === 0) {
      throw new Error(` Limite inválido. Contas não encontradas`);
    }
    //aggregate([{$match:{agencia:paramAgencia}},{$group:{_id:"balance",media:{$avg:"$balance"}}}]);
    //aggregate([{$match:{agencia:999         }},{$group:{_id:"balance",media:{$avg:"$balance"}}}])

    res.status(200).send(docs);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//pesquisar clientes com maior saldo na conta
app.get("/clientesmaiorsaldoemconta/:limite", async (req, res) => {
  try {
    const paramLimite = req.params.limite;

    const docs = await accountModels
      .find({}, { _id: 0, agencia: 1, conta: 1, name: 1, balance: 1 })
      .sort({ balance: -1, name: 1 })
      .limit(Number(paramLimite));

    if (docs.length === 0) {
      throw new Error(` Limite inválido. Contas não encontradas`);
    }

    res.status(200).send(docs);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

//pesquisar clientes com maior saldo na conta
app.patch("/transferirprivate", async (req, res) => {
  try {
    const paramAgenciaPrivate = 99;

    const docs = await accountModels.aggregate([
      { $group: { _id: "$agencia", maiorSaldo: { $max: "$balance" } } },
      { $sort: { _id: 1 } },
    ]);

    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];

      //if (Number(element._id) === 999) {
      const filter = {
        agencia: Number(element._id),
        balance: Number(element.maiorSaldo),
      };

      let doc = await accountModels.findOne(filter);
      doc.agencia = Number(paramAgenciaPrivate);
      await doc.save();
      //}
    }

    const contaPrivate = await accountModels.find({
      agencia: paramAgenciaPrivate,
    });

    res.status(200).send(contaPrivate);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

export { app as accountRouter };
