const request = require('request');

const crpCall = (sen) => {
  if(sen.crp_id.length) {
    request(`http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${sen.crp_id}&apikey=${crpKey}`, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      if (error) {
        console.log('///////ERROR/////////', error);
      }
      sen.candSummary = JSON.parse(body);
    });
  } else {
    console.log(`${sen.first_name} ${sen.last_name} does not have a crp_id`);
  }
};

exports.crpCall = crpCall;
