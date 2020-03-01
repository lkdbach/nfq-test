const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.info(`==> 🌎 app listening on port ${PORT}.`);
});
