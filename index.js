var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');


var app = express();
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.listen(port, () => console.log('Ayo big the server running on port ', port));

var result;
var request = require('request');
request('http://www.opensecrets.org/api/?method=candContrib&output=json&cid=N00007360&cycle=2016&apikey=117704c060b0f63c93e04ad2aaaa0d08', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  result = JSON.parse(body);
});

app.get('/', (req, res) => {
  res.json(result);
});
