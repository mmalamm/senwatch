const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const pp3update = (res, pp_id) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/members/${sen.pp_id}/votes.json`,
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
