const request = require("request");

request("http://www.google.com", (error, response, body) => {
  console.log(body);
});
