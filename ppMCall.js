'use strict';
const fs = require ('fs'),
  os = require('os'),
  request = require('request');

const sec = require('./secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

let ppCallResult;
let result = {};
result.sens = [] ;

let callUrl = {
  url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
  headers : ppHeadersObj
};

const corrections = (sen) => {
  if (sen.twitter_account == 'RepToddYoung') sen.twitter_account = 'SenToddYoung';
  if (sen.twitter_account == 'SenFranken') sen.twitter_account = 'AlFranken';
  if (sen.twitter_account == 'SenKamalaHarris') sen.twitter_account = 'KamalaHarris';
  if (sen.twitter_account == 'SenJohnKennedy') sen.twitter_account = 'JohnKennedyLA';
  if (sen.twitter_account == 'SenatorStrange') sen.twitter_account = 'LutherStrange';
  if ((sen.first_name +' '+ sen.last_name) == 'Bill Cassidy') sen.twitter_account = 'BillCassidy';
  if ((sen.first_name +' '+ sen.last_name) == 'Amy Klobuchar') sen.twitter_account = 'AmyKlobuchar';
  if ((sen.first_name +' '+ sen.last_name) == 'Rand Paul') sen.twitter_account = 'RandPaul';
};

let callback = function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  ppCallResult = 'error';
  if (response.statusCode <= 200) {

    ppCallResult = JSON.parse(body);

    let mems = ppCallResult.results[0].members.filter(mem=>mem.in_office == 'true');
    mems.forEach( mem => {
      corrections(mem);
      result.sens.push({
        pp_id: mem.id,
        first_name: mem.first_name,
        middle_name: mem.middle_name,
        last_name: mem.last_name,
        party: mem.party,
        twitter_account: mem.twitter_account,
        facebook_account: mem.facebook_account,
        rss_url: mem.rss_url,
        crp_id: mem.crp_id,
        domain: mem.domain,
        next_election: mem.next_election,
        total_votes: mem.total_votes,
        missed_votes: mem.missed_votes,
        total_present: mem.total_present,
        phone: mem.phone,
        fax: mem.fax,
        state: mem.state,
        rank: mem.state_rank,
        missed_votes_pct: mem.missed_votes_pct,
        votes_with_party_pct: mem.votes_with_party_pct
      });
    });

    const pp2req = require('./pp2req');
    result.sens.forEach( sen => {
      pp2req.pp2req(sen);
    });

    const dTweetsReq = require('./dTweetsReq');
    result.sens.forEach( sen => {
      dTweetsReq.dTweetsReq(sen);
    });

    // fs.writeFile('sens.json', JSON.stringify(result), (err) => {
    //   if (err) throw err;
    //   console.log('The file has been saved!');
    // });

    // fs.open('sens.json', 'a', (e, id) => {
    //   fs.write( id, JSON.stringify(result), null, 'utf8', () => {
    //     fs.close( id, () => {
    //       console.log('senators json created');
    //     });
    //   });
    // });


  } else {

    fs.open('error_log.txt', 'a', (e, id) => {
      fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
        fs.close( id, () => {
          console.log('error logged');
        });
      });
    });

  }
};

const ppMCall = () => {
  return request(callUrl, callback);
}

exports.ppMCall = ppMCall;
exports.result = result;
