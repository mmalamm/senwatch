'use strict';
const fs = require ('fs'), os = require('os'), request = require('request');

const dTweetsReq = sen => {

  // // corrections
  // if (sen.twitter_account == 'RepToddYoung') sen.twitter_account = 'SenToddYoung';
  // if (sen.twitter_account == 'SenFranken') sen.twitter_account = 'AlFranken';
  // if (sen.twitter_account == 'SenKamalaHarris') sen.twitter_account = 'KamalaHarris';
  // if (sen.twitter_account == 'SenJohnKennedy') sen.twitter_account = 'JohnKennedyLA';
  // if (sen.twitter_account == 'SenatorStrange') sen.twitter_account = 'LutherStrange';
  // if ((sen.first_name +' '+ sen.last_name) == 'Bill Cassidy') sen.twitter_account = 'BillCassidy';
  // if ((sen.first_name +' '+ sen.last_name) == 'Amy Klobuchar') sen.twitter_account = 'AmyKlobuchar';
  // if ((sen.first_name +' '+ sen.last_name) == 'Rand Paul') sen.twitter_account = 'RandPaul';

  let callUrl = `https://projects.propublica.org/politwoops/user/${sen.twitter_account}.json`;

  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {
      let result = JSON.parse(body);
      let d_tweets = result.tweets.map( (tw) => {
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

      sen.d_tweets = 'no_deleted_tweets_found';

      fs.open('error_log.txt', 'a', (e, id) => {
        fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
          fs.close( id, () => {
            console.log(`${sen.first_name} ${sen.last_name} dTweetsReq didnt work`);
          });
        });
      });

    }
  };

  // request(callUrl, callback);

  if (sen.twitter_account.length) {
    request(callUrl, callback);
  } else {
    sen.d_tweets = 'no_twitter_account_on_file';
  };
};

exports.dTweetsReq = dTweetsReq;
