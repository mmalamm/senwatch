const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const sec = require('../secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';
//gold mine for vote data
const depthVote = (res) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/115/bills/s722.json`,
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

exports.depthVote = depthVote;
