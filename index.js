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
const d3 = require('d3');
app.get('/amp-data/crp/:pp_id', (req, res) => {

  let attr = crp.candIndustry['@attributes'];
  let candName = attr.cand_name;
  let party = candName[candName.length - 2];

  let data = crp.candIndustry.industry.map(ind => {
    let name = ind['@attributes'].industry_name;
    let total = Number(ind['@attributes'].total);
    let pacs = Number(ind['@attributes'].pacs);
    let indivs = Number(ind['@attributes'].indivs);
    return { name, total, pacs, indivs };
  });

  //this appends svg el
  let w = 460;
  let h = 400;

  let margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  };

  let width = w - margin.left - margin.right;
  let height = h - margin.top - margin.bottom;

  let colour = d3.color(bannerColor(party)).darker();

  let svg = d3
    .select(`#chart-container-${num}`)
    .append('svg')
    .attr('id', 'chart')
    .attr('height', h)
    .attr('width', w)
    .attr('style', `background:${colour}`);

  let chart = svg
    .append('g')
    .classed('display', true)
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // this creates the axis scales
  let x = d3
    .scaleLinear()
    .domain([0, d3.max(data, d => d.total + 50000)])
    .range([0, width]);
  let y = d3.scaleLinear().domain([0, data.length]).range([0, height]);

  let xAxis = d3.axisBottom(x).ticks(10);
  let xGridlines = () => {
    return d3.axisBottom(x).ticks(10);
  };
  // this makes the bars and labels
  const plot = params => {
    params.svg
      .append('g')
      .attr('class', 'axis')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .style('pointer-events', 'none')
      .style('font-size', '24px')
      .style('fill', colour)
      .style('opacity', '0.3')
      .attr('dx', 350)
      .attr('dy', 13)
      .attr('transform', 'translate(0,0) rotate(90)');

    params.svg
      .append('g')
      .classed('gridline', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xGridlines().tickSize(-height).tickFormat(''));

    params.svg
      .selectAll('.bar')
      .data(params.data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', 0)
      .attr('y', (d, i) => y(i))
      .attr('width', d => x(d.total))
      .attr('height', () => y(1) - 1);

    params.svg
      .selectAll('.bar-label')
      .data(params.data)
      .enter()
      .append('text')
      .classed('bar-label', true)
      .attr('x', /*d => x(d.total/5000)*/ 0)
      .attr('dx', 5)
      .attr('y', (d, i) => y(i))
      .attr('dy', () => y(1) / 1.5 + 2)
      .style('pointer-events', 'none')
      .style('font-size', '24px')
      .text(d => d.name);
  };

  return plot({ data, svg: chart });



});
