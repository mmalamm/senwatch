const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const sec = require('../secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

let callUrl = {
  url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
  headers : ppHeadersObj
};

const pp3update = (res, pp_id) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/members/${pp_id}/votes.json`,
    headers : ppHeadersObj
  };

  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {

      let data = JSON.parse(body);
      let votes = data.results[0].votes;
      res.json(votes);
    } else {

    }
  };
  request(callUrl, callback);
};

exports.pp3update = pp3update;
