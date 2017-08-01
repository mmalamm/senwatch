const fs = require('fs'),
  os = require('os'),
  chalk = require('chalk');

const logError = (errType, sen, response) => {
  fs.open('error_log.txt', 'a', (e, id) => {
    let summText = sen ?
      `${sen.first_name} ${sen.last_name} (${sen.state}-${sen.party})` :
      'Main Call';
    let errorObj = {
      error_type: errType,
      time: Date(Date.now()),
      summary: `${errType} error @${Date(Date.now())} for ${summText})`,
      full_response: response
    };
    fs.write(id, JSON.stringify(errorObj) + os.EOL, null, 'utf8', () => {
      fs.close(id, () => {
        console.log(
          chalk.bgRed(`${errType} error @${Date(Date.now())} for ${summText})`)
        );
      });
    });
  });
};

exports.logError = logError;
