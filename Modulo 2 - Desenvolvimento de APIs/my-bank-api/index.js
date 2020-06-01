var express = require('express');
var fs = require('fs').promises;
var app = express();
var accountsRouter = require('./routes/accounts.js');
global.filemane = 'accounts.json';

app.use(express.json());
app.use('/account', accountsRouter);

app.listen(4000, async () => {
  try {
    await fs.readFile(global.filemane, 'utf8');
    console.log(err);
  } catch (err) {
    const arquivoInicial = { nextid: 1, accounts: [] };
    fs.writeFile(global.filemane, JSON.stringify(arquivoInicial)).catch(
      (err) => {
        console.log(err);
      }
    );
  }

  console.log('APi inicializada');

  // try {
  //   fs.readFile(global.filemane, 'utf8', (err, data) => {
  //     if (err) {
  //       const arquivoInicial = {
  //         nextid: 1,
  //         accounts: []
  //       };

  //       fs.writeFile(global.filemane, JSON.stringify(arquivoInicial), (err) => {
  //         if (err) {
  //           console.log(err);
  //         }
  //       });
  //     } else {
  //       //console.log(err);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  // }
  // console.log('APi inicializada');
});
