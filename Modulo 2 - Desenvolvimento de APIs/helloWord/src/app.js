const express = require('express');
const app = express();
const port = 4000;

app.get('/', (req, res) => res.send('Hello Word 123!'));

app.post('/', (req, res) => res.send('Hello Word post!'));

app.listen(port, () => {
  console.log('App listering on port' + port);
});
