const express = require('express');
const winston = require('winston');
const fs = require('fs').promises;
const app = express();
const accountsRouter = require('./routes/accounts.js');
global.filemane = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const loggersssss = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/account', accountsRouter);

app.listen(4000, async () => {
  try {
    await fs.readFile(global.filemane, 'utf8');
    console.log(err);
    loggersssss.info('API Started!');
  } catch (err) {
    const arquivoInicial = { nextid: 1, accounts: [] };
    fs.writeFile(global.filemane, JSON.stringify(arquivoInicial)).catch(
      (err) => {
        loggersssss.error(err);
      }
    );
  }

  console.log('APi inicializada');

  loggersssss.info('APi inicializada');

  loggersssss.error('Error log');
  loggersssss.warn('Warn log');

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
