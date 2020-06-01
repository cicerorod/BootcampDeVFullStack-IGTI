var express = require('express');
var fs = require('fs');
var app = express();
var accountsRouter = require('./routes/accounts.js');
global.filemane = 'accounts.json';

app.use(express.json());
app.use('/account', accountsRouter);
// app.get('/', function (req, res) {
//   res.send('funcionando');
// });

app.listen(4000, function () {
  try {
    fs.readFile(global.filemane, 'utf8', (err, data) => {
      if (err) {
        const arquivoInicial = {
          nextid: 1,
          accounts: [],
        };

        fs.writeFile(global.filemane, JSON.stringify(arquivoInicial), (err) => {
          if (err) {
            console.log(err);
          }
        });
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }

  console.log('APi inicializada');
});
