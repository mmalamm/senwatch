const fs = require('fs'),
  os = require('os'),
  request = require('request'),
  chalk = require('chalk');

const sec = require('./secrets'),
  crpKey = sec.secrets.crpKey || 'nunya';

const crpReq = (sen, iter) => {
  let callUrl = `http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${sen.crp_id}&apikey=${crpKey}`;
  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {
      console.log(
        chalk.dim(
          `${sen.first_name} ${sen.last_name} crpInfo recieved @${Date(
            Date.now()
          )}`
        )
      );

      let data = JSON.parse(body);
      let indObj = data.response.industries;
      sen.crp.candIndustry = indObj;
    } else {
      console.log(
        `@${Date(
          Date.now()
        )}: ${sen.first_name} ${sen.last_name} crpReq FAILED!`
      );

      const logError = require('../helpers/error_logger.js');
      logError.logError('crpCall', sen, response);
    }

    let status = sen.crp ? 'yes' : 'no';
    let name = `${sen.first_name} ${sen.last_name}`;
    iter.push({ name, status, time: Date.now() });
    console.log(
      chalk.red(
        `crpReq progress: ${iter.length}/100${iter.length == 100 ? '!' : '...'}`
      )
    );
  };

  if (sen.crp_id.length) {
    request(callUrl, callback);
  } else {
    sen.crp = 'no_crp_on_file';

    let name = `${sen.first_name} ${sen.last_name}`;
    iter.push({ name, status: 'no', time: Date.now() });
    console.log(
      chalk.red(
        `crpReq progress: ${iter.length}/100${iter.length == 100 ? '!' : '...'}`
      )
    );
  }
};

exports.crpReq = crpReq;
