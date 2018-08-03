const fs = require('fs'),
  os = require('os'),
  request = require('request'),
  chalk = require('chalk');
const MongoClient = require('mongodb').MongoClient;
const sec = require('../secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

let mems;
let callUrl = {
  url: 'https://api.propublica.org/congress/v1/115/senate/members.json',
  headers: ppHeadersObj
};

let mongodb = sec.secrets.mongodb;

const corrections = require('../seed_sens/helpers/corrections');

let callback = function(error, response, body) {
  console.log(
    chalk.blue('statusCode for main PP call:', response && response.statusCode)
  );

  if (response.statusCode <= 200) {
    ppCallResult = JSON.parse(body);
    mems = ppCallResult.results[0].members.filter(mem => mem.in_office);
    mems.forEach(mem => {
      corrections.corrections(mem);

      MongoClient.connect(mongodb, (err, db) => {
        if (err) {
          return console.log('Unable to connect to mongodb server');
        }
        console.log('connected to mongo');
        db.collection('Sens').find({ pp_id: mem.id }).toArray().then(data => {
          if (data[0].last_name == 'Schumer') {
            let currSen = data[0];
            ///incomplete
            console.log(Object.keys(currSen));
          }
        });
        db.close();
      });
    });
  } else {
    const logError = require('../helpers/error_logger.js');
    logError.logError('ppMCall', null, response);
  }
};

const ppMUpdate = () => {
  return request(callUrl, callback);
};

exports.ppMUpdate = ppMUpdate;

// pp_id: mem.id,
// first_name: mem.first_name,
// middle_name: mem.middle_name,
// last_name: mem.last_name,
// party: mem.party,
// twitter_account: mem.twitter_account,
// facebook_account: mem.facebook_account,
// rss_url: mem.rss_url,
// crp_id: mem.crp_id,
// crp: {},
// domain: mem.domain,
// state: mem.state,
// next_election: mem.next_election,
// phone: mem.phone,
// fax: mem.fax,
// senate_class: mem.senate_class,
// state_rank: mem.state_rank
