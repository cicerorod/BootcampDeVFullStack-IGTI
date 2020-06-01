var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      account = { id: json.nextid++, ...account };
      json.accounts.push(account);

      fs.writeFile(global.filemane, JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/', (req, res) => {
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let retorno = JSON.parse(data);
      delete retorno.nextid;
      res.send(retorno);
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/:id', (req, res) => {
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) {
        throw err;
      }
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
});

router.delete('/:id', (req, res) => {
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) throw err;

      let json = JSON.parse(data);
      let accounts = json.accounts.filter(
        (account) => account.id !== parseInt(req.params.id, 10)
      );

      json.accounts = accounts;

      fs.writeFile(global.filemane, JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.put('/', (req, res) => {
  let newaccount = req.body;

  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      let oldindex = json.accounts.findIndex(
        (account) => account.id === newaccount.id
      );
      json.accounts[oldindex].name = newaccount.name;
      json.accounts[oldindex].balance = newaccount.balance;

      fs.writeFile(global.filemane, JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.end();
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

router.post('/transacao', (req, res) => {
  let params = req.body;

  fs.readFile(global.filemane, 'utf8', (err, data) => {
    try {
      if (err) throw err;
      let json = JSON.parse(data);
      let index = json.accounts.findIndex(
        (account) => account.id === params.id
      );

      if (params.value < 0 && json.accounts[index].balance + params.value < 0) {
        throw new Error('Não há saldo suficiente');
      }

      json.accounts[index].balance =
        json.accounts[index].balance + params.value;

      fs.writeFile(global.filemane, JSON.stringify(json), (err) => {
        if (err) {
          res.status(400).send({ error: err.message });
        } else {
          res.send(json.accounts[index]);
        }
      });
    } catch (err) {
      res.status(400).send({ error: err.message });
    }
  });
});

module.exports = router;
