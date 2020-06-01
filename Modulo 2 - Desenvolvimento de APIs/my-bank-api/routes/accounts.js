var express = require('express');
var fs = require('fs').promises;
var router = express.Router();

router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    account = { id: json.nextid++, ...account };
    json.accounts.push(account);
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/', async (_, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let retorno = JSON.parse(data);
    delete retorno.nextid;
    res.send(retorno);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const account = json.accounts.find(
      (account) => account.id === parseInt(req.params.id, 10)
    );

    if (account) {
      res.send(account);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    let accounts = json.accounts.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.accounts = accounts;
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.put('/', async (req, res) => {
  try {
    let newaccount = req.body;
    let data = await fs.readFile(global.filemane, 'utf8');

    let json = JSON.parse(data);
    let oldindex = json.accounts.findIndex(
      (account) => account.id === newaccount.id
    );
    json.accounts[oldindex].name = newaccount.name;
    json.accounts[oldindex].balance = newaccount.balance;
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.end();
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
});

router.post('/transacao', async (req, res) => {
  try {
    let params = req.body;
    let data = await fs.readFile(global.filemane, 'utf8');

    let json = JSON.parse(data);
    let index = json.accounts.findIndex((account) => account.id === params.id);

    if (params.value < 0 && json.accounts[index].balance + params.value < 0) {
      throw new Error('Não há saldo suficiente');
    }

    json.accounts[index].balance = json.accounts[index].balance + params.value;

    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.send(json.accounts[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
