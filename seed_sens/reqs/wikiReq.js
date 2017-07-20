const fs = require ('fs'), os = require('os'), request = require('request'), chalk = require('chalk');

const sec = require('./secrets'), ppHeadersObj = sec.secrets.ppHeader || 'nunya';

const formatName = (sen_name) => {
  //correct names for wikipedia api
  let newname = sen_name
    .replace('Charles Grassley', 'Chuck Grassley') // Iowa
    .replace('John Kennedy', 'John Neely Kennedy') //Louisiana
    .replace('Dan Sullivan', 'Dan Sullivan (U.S. Senator)') //Alaska
    .replace('Michael Crapo', 'Mike Crapo') //Idaho
    .replace('Mike Lee', 'Mike Lee (U.S. politician)') //Utah
    .replace('Christopher Coons', 'Chris Coons')
    .replace('Thomas Carper', 'Tom Carper')
    .replace('Benjamin Cardin', 'Ben Cardin')
    .replace('Bob Casey','Bob Casey Jr.')
    .replace('Jack Reed','Jack Reed (politician)')
    .replace('Edward Markey', 'Ed Markey')
    .replace('Margaret Hassan', 'Maggie Hassan')
    .replace('Richard Durbin','Dick Durbin')
    .replace('Gary Peters','Gary Peters (politician)')
    .replace('Shelley Capito', 'Shelley Moore Capito')
    .replace('James Inhofe','Jim Inhofe')
    .replace('Charles Schumer', 'Chuck Schumer')
    .replace('Bernard Sanders', 'Bernie Sanders')
    .replace('Michael Enzi', 'Mike Enzi')
    .replace('Robert Menendez', 'Bob Menendez')
    .replace('Christopher Murphy', 'Chris Murphy (Connecticut politician)')
    .replace('Ron Johnson','Ron Johnson (American politician)')
    .replace('Patrick Toomey','Pat Toomey')
    .replace(' III', '')
    .replace(' ', '%20');
    return newname;
};

const wikiReq = (sen, iter) => {
  let sen_name = formatName(`${sen.first_name} ${sen.last_name}`);
  let defaultImg = `https://www.congress.gov/img/member/${sen.pp_id.toLowerCase()}.jpg`;

  let callUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${sen_name}&format=json&prop=pageimages&origin=*`;
  let callback = (err, response, body) => {
    if (response.statusCode <= 200) {

      console.log(chalk.dim(`${sen.first_name} ${sen.last_name} wiki recieved @${Date(Date.now())}`));

      let data = JSON.parse(body);
      let result = data.query.pages;
      let thumbnail = result[Object.keys(result)[0]].thumbnail;
      let pic_url = thumbnail ? thumbnail.source : defaultImg;
      pic_url = pic_url.replace(/\d+px/, '500px');
      console.log(pic_url);
      sen.img_url = pic_url;

    } else {
      console.log(`@${Date(Date.now())}: ${sen.first_name} ${sen.last_name} wiki FAILED!`);

      const logError = require('../helpers/error_logger.js');
      logError.logError('wikiCall', sen, response);

    }

    let status = sen.img_url === defaultImg ? 'no' : 'yes';
    let name = `${sen.first_name} ${sen.last_name}`;
    iter.push({name,status,time:Date.now()});
    console.log(chalk.magenta(`wiki progress: ${iter.length}/100${iter.length==100?'!':'...'}`));
  };

  request(callUrl, callback);
};

exports.wikiReq = wikiReq;
