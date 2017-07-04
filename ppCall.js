'use strict'
var request = require('request');
const port = process.env.PORT || 3000;

const fs = require('fs');
const os = require('os');


let ppCallResult;
let result = {};
result.sens = [] ;

let callUrl = {
  url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
  headers : {"X-API-Key":'nunya'}
}

 //let callUrl = 'https://projects.propublica.org/politwoops/user/realdonaldtrump.json';


let callback = function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  ppCallResult = 'error';
  if (response.statusCode <= 200) {

    ppCallResult = JSON.parse(body);

    let mems = ppCallResult.results[0].members.filter(mem=>mem.in_office == 'true');
    mems.forEach( mem => {
      result.sens.push({
        pp_id: mem.id,
        first_name: mem.first_name,
        middle_name: mem.middle_name,
        last_name: mem.last_name,
        party: mem.party,
        twitter_account: mem.twitter_account,
        facebook_account: mem.facebook_account,
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


    fs.writeFile('sens.json', JSON.stringify(result), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });

    // fs.open('sens.json', 'a', (e, id) => {
    //   fs.write( id, JSON.stringify(result), null, 'utf8', () => {
    //     fs.close( id, () => {
    //       console.log('senators json created');
    //     });
    //   });
    // });


  } else {


    fs.open('error_log.txt', 'a', (e, id) => {
      fs.write( id, JSON.stringify(response) + os.EOL+ os.EOL+ os.EOL+ os.EOL+ os.EOL, null, 'utf8', () => {
        fs.close( id, () => {
          console.log('error logged');
        });
      });
    });

  }
}

request(callUrl, callback);
