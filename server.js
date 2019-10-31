const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(port, err => {
  if (err) return console.log(err);
  console.log(`Server started on http://localhost:${port}`);
});
