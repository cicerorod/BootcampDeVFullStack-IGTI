import express from 'express';
const app = express();
const router = express.Router();

router.get('/abc', (req, res) => {
  console.log('/teste');
  res.end();
});

app.use('/teste', router);

app.listen(5000, async () => {
  console.log('API started!');
});
