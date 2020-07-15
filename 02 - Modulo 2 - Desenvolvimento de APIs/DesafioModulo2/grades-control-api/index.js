const express = require('express');
const fs = require('fs').promises;
const app = express();
const gradeRouter = require('./routes/grades.js');
const port = 7000;
global.filemane = 'grades.json';

app.use(express.json());
app.use('/grades', gradeRouter);

app.listen(port, async () => {
  try {
    fs.readFile(global.filemane, 'utf8', (err, data) => {});
    console.log('Leitura do arquivo realizada com sucesso');
  } catch (err) {
    console.log(err);
  }

  console.log('APi inicializada na porta: ' + port);
});
