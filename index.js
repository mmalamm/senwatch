const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sec = require('./secrets');
const app = express();
const port = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;
const mongodb = sec.secrets.mongodb;

app.listen(port, () => console.log('Ayo big the server running on port ', port));


app.get('/sens', (req, res) => {
  MongoClient.connect(mongodb, (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    db.collection('Sens').find().toArray().then( (data) => {
      res.json(data);
    });
  });
});

const dTweetsUpdate = require('./update_sens/dTweetsUpdate');
app.get('/dtweets/:twitter_account', (req, res) => {
  let twAccount = req.params.twitter_account;
  dTweetsUpdate.dTweetsUpdate(res, twAccount);
});

const pp3update = require('./update_sens/pp3update');
app.get('/votes/:pp_id', (req, res) => {
  let ppId = req.params.pp_id;
  pp3update.pp3update(res, ppId);
});
