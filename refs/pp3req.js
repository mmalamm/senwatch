const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const sec = require('./secrets'), ppHeadersObj = sec.secrets.ppHeader || 'nunya';

const pp3req = (sen, iter) => {

  let callUrl = {
    url : `https://api.propublica.org/congress/v1/members/${sen.pp_id}/votes.json`,
    headers : ppHeadersObj
  };
  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {

      console.log(chalk.dim(`${sen.first_name} ${sen.last_name} pp3 recieved @${Date(Date.now())}`));

      let data = JSON.parse(body);
      let votes = data.results[0].votes;
      sen.votes = votes;

    } else {
      console.log(`@${Date(Date.now())}: ${sen.first_name} ${sen.last_name} votes FAILED!`);

      const logError = require('../helpers/error_logger.js');
      logError.logError('pp3Call', sen, response);

    }

    let status = sen.votes ? 'yes' : 'no';
    let name = `${sen.first_name} ${sen.last_name}`;
    iter.push({name,status,time:Date.now()});
    console.log(chalk.cyan(`pp3 progress: ${iter.length}/100${iter.length==100?'!':'...'}`));
  };

  request(callUrl, callback);
};

exports.pp3req = pp3req;
