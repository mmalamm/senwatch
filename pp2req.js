const fs = require ('fs'), os = require('os'), request = require('request');

const sec = require('./secrets'), ppHeadersObj = sec.secrets.ppHeader || 'nunya';

const pp2req = (sen, iter) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/members/${sen.pp_id}.json`,
    headers : ppHeadersObj
  };
  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {

      console.log(`${sen.first_name} ${sen.last_name} pp2 recieved @${Date(Date.now())}`);

      let data = JSON.parse(body);
      let result = data.results[0];
      sen.dob = result.date_of_birth;
      sen.gender = result.gender;
      sen.committees = result.roles[0].committees;

    } else {
      console.log(`@${Date(Date.now())}: ${sen.first_name} ${sen.last_name} committees FAILED!`);

      fs.open('error_log.txt', 'a', (e, id) => {
        fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
          fs.close( id, () => {
            console.log(`pp2req for ${sen.first_name} ${sen.last_name} didnt work! error logged.`);
          });
        });
      });

    }

    let status = sen.dob ? 'yes' : 'no';
    let name = `${sen.first_name} ${sen.last_name}`;
    iter.push({name,status,time:Date.now()});
    console.log(`pp2 progress: ${iter.length}/100${iter.length==100?'!':'...'}`);
  };

  request(callUrl, callback);
};

exports.pp2req = pp2req;
