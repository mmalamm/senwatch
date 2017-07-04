const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');

const port = process.env.PORT || 3000;

var sens = require('./sens');
sens = sens.sens;
let i = 0, fuckedUp = [], noAcc = [];

sens.forEach( sen => {

  // corrections
  if (sen.twitter_account == 'RepToddYoung') sen.twitter_account = 'SenToddYoung';
  if (sen.twitter_account == 'SenFranken') sen.twitter_account = 'AlFranken';
  if (sen.twitter_account == 'SenKamalaHarris') sen.twitter_account = 'KamalaHarris';
  if (sen.twitter_account == 'SenJohnKennedy') sen.twitter_account = 'JohnKennedyLA';
  if (sen.twitter_account == 'SenatorStrange') sen.twitter_account = 'LutherStrange';
  if ((sen.first_name +' '+ sen.last_name) == 'Bill Cassidy') sen.twitter_account = 'BillCassidy';
  if ((sen.first_name +' '+ sen.last_name) == 'Amy Klobuchar') sen.twitter_account = 'AmyKlobuchar';
  if ((sen.first_name +' '+ sen.last_name) == 'Rand Paul') sen.twitter_account = 'RandPaul';



  if (sen.twitter_account.length) {

    request(`https://projects.propublica.org/politwoops/user/${sen.twitter_account}.json`, function(err, res, body) {

      console.log(sen.twitter_account);
      if (res.statusCode <= 200) {
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
      } else {
        console.log(`${sen.first_name} ${sen.last_name} is all fucked up`);
        console.log(res.body);
        fuckedUp.push(`${sen.first_name} ${sen.last_name}`);
        sen.d_tweets = 'no_deleted_tweets_found';
      }

    });
  } else {
    console.log(`${sen.first_name} ${sen.last_name} does not have a twitter_account`);
    noAcc.push(`${sen.first_name} ${sen.last_name}`);
    sen.d_tweets = 'no_twitter_account_on_file';
  }
});


// put this into a promise, to be fulfilled upon all api calls returning
// fs.writeFile('sens.json', JSON.stringify(sens), (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// });


app.listen(port, () => console.log('Ayo big the server running on port ', port));

app.get('/pp', (req, res) => {
  res.json({
    gotDTweets: i,
    fuckedUp,
    noAcc,
    sens
  });
});
