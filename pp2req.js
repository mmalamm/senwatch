const fs = require ('fs'),
  os = require('os'),
  request = require('request');

const sec = require('./secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

const pp2req = (sen) => {
  let callUrl = {
    url : `https://api.propublica.org/congress/v1/members/${sen.id}.json`,
    headers : ppHeadersObj
  };

  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {

      let result = JSON.parse(body).results[0];
      sen.dob = result.date_of_birth;
      sen.gender = result.gender;
      sen.committees = result.roles[0].committees;

      console.log(`${sen.first_name} ${sen.last_name} ////DOB, gender, committees updated @${Date(Date.now())}`);

    } else {

      fs.open('error_log.txt', 'a', (e, id) => {
        fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
          fs.close( id, () => {
            console.log(`${sen.first_name} ${sen.last_name} didnt work`);
          });
        });
      });

    }
  };

  request(callUrl, callback);
};

exports.pp2req = pp2req;
