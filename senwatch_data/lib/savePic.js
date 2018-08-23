const request = require("request");
const fs = require("fs");

const savePic = (imgUrl, fileName) => {
  request.get({ url: imgUrl, encoding: "binary" }, (err, response, body) => {
    fs.writeFileSync(`senPicsRaw/${fileName}.jpg`, body, "binary");
  });
};

module.exports = savePic;
