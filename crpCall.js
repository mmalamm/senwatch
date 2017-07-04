const request = require('request');

let crpCallResult;
const crpCall = (sen) => {
  if(sen.crp_id.length) {
    request(`http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${sen.crp_id}&apikey=${crpKey}`, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      crpCallResult = 'error';
      if (response.statusCode <= 200) {
        crpCallResult = JSON.parse(body);
      } else {


        fs.open('crp_error_log.txt', 'a', (e, id) => {
          fs.write( id, JSON.stringify(response) + os.EOL, null, 'utf8', () => {
            fs.close( id, () => {
              console.log('error logged');
            });
          });
        });

      }
      console.log(crpCallResult);
    });
  } else {
    console.log(`${sen.first_name} ${sen.last_name} does not have a crp_id`);
  }
};

exports.crpCall = crpCall;
