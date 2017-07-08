const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;


/*******/
// let testObj = { twitter_account : 'RepToddYoung' };
// const corrections = require('./corrections');
// corrections.corrections(testObj);

// let testObj = {pp_id:'F000444'};
// testObj.iter = [];
// const pp3req = require('./pp3req');
// pp3req.pp3req(testObj, testObj.iter);

// let testObj = { twitter_account: 'realdonaldtrump' };
// const dTweetsReq = require('./dTweetsReq');
// console.log(dTweetsReq);
// dTweetsReq.dTweetsReq(testObj);

// let testObj = { crp_id: 'N00026823', iter:[] };
// const crpReq = require('./crpReq');
// console.log(crpReq);
// crpReq.crpReq(testObj, testObj.iter);

// let testObj = {
//   iter: [],
//   first_name: 'Charles',
//   last_name: 'Grassley'
// }
// const wikiReq = require('./wikiReq');
// wikiReq.wikiReq(testObj, testObj.iter);

const ppMCall = require('./reqs/ppMCall');
ppMCall.ppMCall();
let testObj = ppMCall.result;
console.log(ppMCall);
/*******/

app.listen(port, () => console.log('Ayo big server running on port ', port));

app.get('/', (req, res) => {
  res.json(testObj);
});


const fs = require('fs');
app.get('/submit', (req, res) => {

  fs.writeFile('sens.json', JSON.stringify({created_at:Date(Date.now()),sens:testObj.sens}), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  res.send('Check the file');
});
