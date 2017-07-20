const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;


// const ppMUpdate = require('../update_sens/ppMUpdate');
// ppMUpdate.ppMUpdate();

const ppMwAppend = require('./ppMwAppend');
ppMwAppend.ppMwAppend();

app.listen(port, () => console.log('Ayo big server running on port ', port));

app.get('/', (req, res) => {
  res.json(testObj);
});
