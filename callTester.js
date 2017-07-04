'use strict'
const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;


/*******/
// let testObj = {id:'F000444'};
//
// const pp2req = require('./pp2req');
//
// pp2req.pp2req(testObj);

// let testObj = { twitter_account: 'realdonaldtrump' };
//
// const dTweetsReq = require('./dTweetsReq');
// console.log(dTweetsReq);
// dTweetsReq.dTweetsReq(testObj);


// const ppMCall = require('./ppMCall');
// ppMCall.ppMCall();
// let testObj = ppMCall.result;
// console.log(ppMCall);
/*******/

app.listen(port, () => console.log('Ayo big the server running on port ', port));

app.get('/pp', (req, res) => {
  res.json(testObj);
});
