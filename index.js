const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sec = require('./secrets');
const app = express();
const port = process.env.PORT || 3000;

const MongoClient = require('mongodb').MongoClient;
const mongodb = sec.secrets.mongodb;

app.listen(port, () =>
  console.log('Ayo big the server running on port ', port)
);

// app.use('/api', (req, res, next) => {
//   if (!req.headers.bovine) return res.send('access denied');
//   next();
// });

app.get('/api/sens', (req, res) => {
  MongoClient.connect(mongodb, (err, db) => {
    if (err) {
      return console.log('Unable to connect to mongodb server');
    }
    db.collection('Sens').find().toArray().then(data => {
      res.json(data);
    });
  });
});

const dTweetsUpdate = require('./update_sens/dTweetsUpdate');
app.get('/api/dtweets/:twitter_account', (req, res) => {
  let twAccount = req.params.twitter_account;
  dTweetsUpdate.dTweetsUpdate(res, twAccount);
});

const pp3update = require('./update_sens/pp3update');
app.get('/api/sens/:pp_id/votes', (req, res) => {
  let ppId = req.params.pp_id;
  pp3update.pp3update(res, ppId);
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

//next patch stuff
const voteCall = require('./vote_info');
app.get('/vote/:session/:roll_call', (req, res) => {
  let roll_call = req.params.roll_call;
  let session = req.params.session;
  voteCall.voteCall(res, { roll_call, session });
});

const depthVote = require('./vote_info/depthvote');
app.get('/bkw', (req, res) => {
  depthVote.depthVote(res);
});

// https://www.propublica.org/datastore/api/campaign-finance-api
const ampStuff = require('./amp/amp-data');
app.get('/amp-data', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  ampStuff.ampStuff(res);
});
app.get('/amp/dtweets/:twitter_account', (req, res) => {
  let twAccount = req.params.twitter_account;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  dTweetsUpdate.dTweetsUpdate(res, twAccount);
});
app.get('/amp/sens/:pp_id/votes', (req, res) => {
  let ppId = req.params.pp_id;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  pp3update.pp3update(res, ppId);
});
app.get('/amp', (req, res) => {
  res.sendFile(path.join(__dirname + '/amp/amp.html'));
});
