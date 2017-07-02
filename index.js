const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const sec = require('./secrets');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));


app.listen(port, () => console.log('Ayo big the server running on port ', port));

let sens = [];

let crpCallResult;
const request = require('request');
let crpKey = sec.secrets.crpKey || 'nunya';
// request(`http://www.opensecrets.org/api/?method=candSummary&output=json&cid=N00007360&apikey=${crpKey}`, function (error, response, body) {
//   // console.log('error:', error); // Print the error if one occurred
//   // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   crpCallResult = JSON.parse(body);
// });

let ppCallResult;
const curl = require('curlrequest');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

curl.request(
  {
    url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
    headers : ppHeadersObj
  }, (err, stdout) => {
    ppCallResult = JSON.parse(stdout);
    let mems = ppCallResult.results[0].members.filter(mem=>mem.in_office == 'true');
    mems.forEach( mem => {
      sens.push({
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

    let i = 0;
    sens.forEach( sen => {
      if(sen.crp_id.length) {
        request(`http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${sen.crp_id}&apikey=${crpKey}`, function (error, response, body) {
          // console.log('error:', error); // Print the error if one occurred
          // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          if (error) {
            console.log('///////ERROR/////////', error);
          }
          sen.candSummary = JSON.parse(body);
        });
      } else {
        console.log(`${sen.first_name} ${sen.last_name} does not have a crp_id`);
      }
    });

    sens.forEach( sen => {
      sen.d_twitter_account = sen.twitter_account;
      if (sen.twitter_account == 'RepToddYoung') sen.d_twitter_account = 'SenToddYoung';
      if (sen.twitter_account == 'SenFranken') sen.d_twitter_account = 'alfranken';
      if (sen.twitter_account == 'SenKamalaHarris') sen.d_twitter_account = 'kamalaharris';
      if (sen.twitter_account == 'SenatorStrange') sen.d_twitter_account = '';
      if (sen.twitter_account == 'SenJohnKennedy') sen.d_twitter_account = 'johnkennedyla';
      if (sen.d_twitter_account.length) {

        request(`https://projects.propublica.org/politwoops/user/${sen.d_twitter_account}.json`, function(err, res, body) {
          if (err) {
            console.log('///////ERROR/////////', err);
            return;
          }
          console.log(sen.twitter_account);
          let d_tweets = JSON.parse(body);
          // console.log(d_tweets);
          console.log(sen.first_name, sen.last_name, sen.state, sen.party, ' good 2 go');
          i++;
          console.log(i);
          d_tweets = d_tweets.tweets;
          d_tweets = d_tweets.map( (tw) => {
            return {
              created_at: tw.created_at,
              deleted_at: tw.updated_at,
              body: tw.content,
              profile_pic_url: tw.details.user.profile_image_url,
              tw_user_name: tw.user_name
            };
          });
          sen.d_tweets = d_tweets;
        });
      } else {
        console.log(`${sen.first_name} ${sen.last_name} does not have a twitter_account`);
      }
    });
  });





app.get('/crp', (req, res) => {
  res.json(crpCallResult);
});

app.get('/pp', (req, res) => {
  res.json(sens);
});
