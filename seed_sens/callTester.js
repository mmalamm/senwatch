const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;


const MongoClient = require('mongodb').MongoClient;

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
testObj.mongoIter = [];
console.log(ppMCall);
/*******/

app.listen(port, () => console.log('Ayo big server running on port ', port));

app.get('/', (req, res) => {
  res.json(testObj.sens[52]);
});


app.get('/mongoDB', (req, res) => {
  const sec = require('./secrets');
  let mongodb = sec.secrets.mongodb;
  testObj.sens.forEach( sen => {
    MongoClient.connect(mongodb, (err, db) => {
      if (err) {
        return console.log('Unable to connect to mongodb server');
      }
      console.log('Connected to MongoDB server');

      db.collection('Sens').insertOne({
        pp_id: sen.pp_id,
        first_name: sen.first_name,
        middle_name: sen.middle_name,
        last_name: sen.last_name,
        party: sen.party,
        office: sen.office,
        twitter_account: sen.twitter_account,
        facebook_account: sen.facebook_account,
        rss_url: sen.rss_url,
        crp_id: sen.crp_id,
        crp: sen.crp,
        domain: sen.domain,
        next_election: sen.next_election,
        phone: sen.phone,
        fax: sen.fax,
        state: sen.state,
        state_rank: sen.state_rank,
        senate_class: sen.senate_class,
        dob: sen.dob,
        gender: sen.gender,
        committees: sen.committees,
        img_url: sen.img_url
      });
      let DBstatus = `${sen.first_name} ${sen.last_name} committed to db!`;
      console.log(DBstatus);
      testObj.mongoIter.push(DBstatus);
      console.log(`${testObj.mongoIter.length}/100`);

      db.close();
    });

  });
});


const fs = require('fs');
app.get('/submit', (req, res) => {

  fs.writeFile('sens.json', JSON.stringify({created_at:Date(Date.now()),sens:testObj.sens}), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  res.send('Check the file');
});
