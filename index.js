var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var sec = require('./secrets');
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log('Ayo big the server running on port ', port));

var crpCallResult;
var request = require('request');
let crpKey = sec.secrets.crpKey || 'nunya';
request(`http://www.opensecrets.org/api/?method=candContrib&output=json&cid=N00007360&cycle=2016&apikey=${crpKey}`, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  crpCallResult = JSON.parse(body);
});

var ppCallResult;
var curl = require('curlrequest');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';
curl.request(
  {
    url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
    headers : ppHeadersObj
  }, (err, stdout) => {
    ppCallResult = JSON.parse(stdout);
  });

app.get('/crp', (req, res) => {
  res.json(crpCallResult);
});

app.get('/pp', (req, res) => {
  res.json(ppCallResult);
});
