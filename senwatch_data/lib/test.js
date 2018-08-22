const savePic = require("./savePic");
const axios = require("axios");
const secrets = require("../../secrets");
const getSenImg = require("./getSenImg");

axios({
  url: "https://api.propublica.org/congress/v1/115/senate/members.json",
  method: "get",
  headers: secrets.propublicaHeader
})
  .then(data => data.data.results[0].members)
  .then(sens => {
    Promise.all(sens.map(s => getSenImg(s))).then(arr => {
      arr.forEach((url, i) => savePic(url, sens[i].id));
    });
  });
