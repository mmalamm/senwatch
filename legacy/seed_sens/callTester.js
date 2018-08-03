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

app.get('/update_sens', (req, res) => {
  const sec = require('./secrets');
  let mongodb = sec.secrets.mongodb;
  testObj.sens.forEach(mem => {
    let updatedSen = {
      pp_id: mem.id, //1
      first_name: mem.first_name, //2
      middle_name: mem.middle_name, //3
      last_name: mem.last_name, //4
      party: mem.party, //5
      twitter_account: mem.twitter_account, //7
      facebook_account: mem.facebook_account, //8
      rss_url: mem.rss_url, //9
      crp_id: mem.crp_id, //10
      crp: mem.crp, //18
      domain: mem.domain, //11
      next_election: mem.next_election, //13
      phone: mem.phone, //14
      fax: mem.fax, //15
      state: mem.state, //12
      state_rank: mem.state_rank, //17
      senate_class: mem.senate_class, //16
      dob: mem.dob, //19
      gender: mem.gender, //20
      committees: mem.committees, //21
      img_url: mem.img_url, //22
      office: mem.office //6
    };

    MongoClient.connect(mongodb, (err, db) => {
      if (err) {
        return console.log('Unable to connect to mongodb server');
      }
      console.log('Connected to MongoDB server');

      db
        .collection('Sens')
        .findOneAndUpdate(
          { pp_id: mem.id },
          {
            $set: { crp: mem.crp }
          },
          { returnNewDocument: true }
        )
        .then(result => {
          let DBstatus = `${mem.first_name} ${mem.last_name} updated!`;
          console.log(DBstatus);
          testObj.mongoIter.push(DBstatus);
          console.log(result);
          console.log(`${testObj.mongoIter.length}/100`);
          db.close();
        });
    });
  });
});

app.get('/mongoDB', (req, res) => {
  const sec = require('./secrets');
  let mongodb = sec.secrets.mongodb;
  testObj.sens.forEach(sen => {
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
  fs.writeFile(
    'sens.json',
    JSON.stringify({ created_at: Date(Date.now()), sens: testObj.sens }),
    err => {
      if (err) throw err;
      console.log('The file has been saved!');
    }
  );

  res.send('Check the file');
});
