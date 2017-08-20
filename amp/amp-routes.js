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
