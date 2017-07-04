const express = require('express');
const app = express();
var request = require('request');
const port = process.env.PORT || 3000;

const fs = require('fs');
const os = require('os');
app.listen(port, () => console.log('Ayo big the server running on port ', port));
let crpCallResult;

let callUrl = 'https://projects.propublica.org/politwoops/user/realdonaldtrump.json';

request(callUrl, function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  crpCallResult = 'error';
  if (response.statusCode <= 200) {
    crpCallResult = JSON.parse(body);
  } else {


    fs.open('crp_error_log.txt', 'a', (e, id) => {
      fs.write( id, JSON.stringify(response) + os.EOL+ os.EOL+ os.EOL+ os.EOL+ os.EOL, null, 'utf8', () => {
        fs.close( id, () => {
          console.log('error logged');
        });
      });
    });

  }
  console.log(crpCallResult);
});


app.get('/crp', (req, res) => {
  res.json(crpCallResult);
});
