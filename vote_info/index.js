const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const sec = require('../secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

const voteCall = (res, vote) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/115/senate/sessions/${vote.session}/votes/${vote.roll_call}`,
    headers : ppHeadersObj
  };

  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {
      let data = JSON.parse(body);
      res.json(data);
    } else {

    }
  };
  request(callUrl, callback);
};

exports.voteCall = voteCall;
