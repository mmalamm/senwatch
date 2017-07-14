const express = require('express');
const app = express();
const request = require('request');
const port = process.env.PORT || 3000;

/*********************/

const seedOneCall = require('./seed_sens/reqs/seed_one_call');
let testObj = seedOneCall.result;
seedOneCall.seedOneCall('B001135');
/*********************/


app.listen(port, () => console.log('Ayo big server running on port ', port));

app.get('/', (req, res) => {
  res.json(testObj);
});

/*********************/
// additional routes and tools

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
        twitter_account: sen.twitter_account,
        facebook_account: sen.facebook_account,
        rss_url: sen.rss_url,
        crp_id: sen.crp_id,
        crp: sen.crp,
        domain: sen.domain,
        next_election: sen.next_election,
        total_votes: sen.total_votes,
        missed_votes: sen.missed_votes,
        total_present: sen.total_present,
        phone: sen.phone,
        fax: sen.fax,
        state: sen.state,
        state_rank: sen.state_rank,
        senate_class: sen.senate_class,
        missed_votes_pct: sen.missed_votes_pct,
        votes_with_party_pct: sen.votes_with_party_pct,
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
  let currentSen = testObj.sens[0];
  fs.writeFile(`${currentSen.first_name}_${currentSen.last_name}.json`, JSON.stringify({created_at:Date(Date.now()),sens:testObj.sens}), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });

  res.send('Check the file');
});
