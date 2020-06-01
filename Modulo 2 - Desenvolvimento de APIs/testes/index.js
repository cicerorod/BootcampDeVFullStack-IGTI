import express from 'express';
import winston from 'winston';

const app = express();
app.use(express.json());

app.use(express.static('public'));
app.use('./images', express.static('public'));

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'grades-control-api.log' }),
  ],
  format: combine(
    label({ label: 'grades-control-api' }),
    timestamp(),
    myFormat
  ),
});

logger.error('Error log');
logger.warn('Warn log');
logger.info('Info log');
logger.verbose('Verbose log');
logger.debug('Debug log');
logger.silly('Silly log');
logger.log('info', 'Hello with parameter!');

app.listen(5000, async () => {
  console.log('API started!');
});

//seção rotas
//Retorno todoso o nome o metodo que esta chamando
app.all('/testeAll', (req, res) => {
  res.send(req.method);
});

//retorno sem a letra anterior ao ? Exemplo: chamando com a palavra test tambem funciona
app.get('/teste?', (_, res) => {
  res.send('/teste?');
});
// retorno quando a chamada é buzz,buzzzzz  OBS: nao retorno buzzssssdfsdfsdfsdf
app.get('/buzz+', (req, res) => {
  res.send('/buzz+');
});

// retorna quando qualquer coisa é substituido por *
app.get('/one*blue', (req, res) => {
  res.send('/one*blue');
});
//retorna test ou testeing
app.post('/test(ing)?', (req, res) => {
  res.send('/test(ing)?');
});

// retorna quando alguma coisa e escrita antes de res
app.post(/.*Red$/, (req, res) => {
  res.send('/.*Red$/');
});

app.post('/testparam/:id/:nome', (req, res) => {
  res.send(req.params.id + ' ' + req.params.nome);
});

// app.get(
//   '/testMultipleHandlers',
//   (_, res, next) => {
//     console.log('First method');
//     res.send('First method');
//     next();
//   },
//   (_, res) => {
//     console.log('Second method');
//     res.send('Second method');
//     res.end();
//   }
// );

app
  .route('/testRoute')
  .get((req, res) => {
    res.end();
  })
  .post((req, res) => {
    res.end();
  })
  .delete((req, res) => {
    res.end();
  });

// Seção Middlewares

app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.use('/testMiddleware', (req, res, next) => {
  console.log('/testMiddleware');
  if (req.method === 'GET') {
    next();
  } else {
    res.end();
  }
});

app.get('/testMiddleware', (req, res) => {
  res.send('GET /testMiddleware');
});

//Secao Tratamento de Erros

// app.get('/', function (req, res) {
//   throw new Error('Error');
// });

app.post('/', async (req, res, next) => {
  //throw new Error('Error message');
  try {
    throw new Error('Error message');
  } catch (err) {
    next(err);
  }
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('500');
});

app.use(function (err, req, res, next) {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('An error occurred!');
});
