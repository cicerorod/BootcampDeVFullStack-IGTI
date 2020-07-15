const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

router.post('/', async (req, res) => {
  let account = req.body;
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    account = { id: json.nextid++, ...account };
    json.accounts.push(account);
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.end();
    //loggersssss.info(`POST / account -> $(JSON.stringify(account))`);
  } catch (err) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('POST / account -> ' + err.message);
  }
});

router.get('/', async (_, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let retorno = JSON.parse(data);
    delete retorno.nextid;
    res.send(retorno);
    //loggersssss.info('GET / account ');
  } catch (err) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('GET / account -> ' + err.message);
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
      //loggersssss.info('GET /account/:id ');
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('GET / account/:id -> ' + err.message);
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
    //loggersssss.info('Delete /account/:id ' + req.params.id);
  } catch (err) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('Delete -> ' + err.message);
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
    //loggersssss.info('Delete /account/:id ' + JSON.stringify(newaccount));
  } catch (error) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('PUT /account ' + err.message);
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

    //loggersssss.info(
    //  'Transacao /account/transacao/:id ' + JSON.stringify(json.accounts[index])
    //);
  } catch (err) {
    res.status(400).send({ error: err.message });
    //loggersssss.error('transacao /account ' + err.message);
  }
});

module.exports = router;
