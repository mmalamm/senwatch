const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const dTweetsUpdate = (res, tw_account) => {

  let callUrl = `https://projects.propublica.org/politwoops/user/${tw_account}.json`;

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

      res.json(d_tweets);
    } else {

    }
  };
  request(callUrl, callback);
};

exports.dTweetsUpdate = dTweetsUpdate;
