const savePic = require("./savePic");
const axios = require("axios");
const secrets = require("../../secrets");
const getSenImg = require("./getSenImg");

(async () => {
  const data = await axios({
    url: "https://api.propublica.org/congress/v1/115/senate/members.json",
    method: "get",
    headers: secrets.propublicaHeader
  });
  const sens = data.data.results[0].members;

  const promises = sens.map(s => getSenImg(s));

  await Promise.all(promises).then(arr => {
    arr.forEach((url, i) => savePic(url, sens[i].id));
  });
})();
