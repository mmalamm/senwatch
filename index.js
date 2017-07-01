var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var secrets = require('./secrets');
console.log(secrets);
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log('Ayo big the server running on port ', port));

var result;
var request = require('request');
request('http://www.opensecrets.org/api/?method=candContrib&output=json&cid=N00007360&cycle=2016&apikey=117704c060b0f63c93e04ad2aaaa0d08', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  result = JSON.parse(body);
});

var curl = require('curlrequest');

let ppHeadersObj = secrets.secrets.ppHeader || 'nunya';
console.log(ppHeadersObj);
curl.request(
  {
    url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
    headers : ppHeadersObj
  }, (err, stdout) => {
    console.log(stdout);
  });

app.get('/', (req, res) => {
  res.json(result);
});
