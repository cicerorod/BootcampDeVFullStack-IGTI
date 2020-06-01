var express = require('express');
var fs = require('fs');
var router = express.Router();

router.post('/', (req, res) => {
  let account = req.body;
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    if (!err) {
      try {
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
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

router.get('/', (req, res) => {
  fs.readFile(global.filemane, 'utf8', (err, data) => {
    if (!err) {
      let retorno = JSON.parse(data);
      delete retorno.nextid;
      res.send(retorno);
    } else {
      res.status(400).send({ error: err.message });
    }
  });
});

module.exports = router;
