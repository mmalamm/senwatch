const axios = require("axios");
const formatName = require("./wikiCorrections");

const getSenImg = sen => {
  const sen_name = formatName(`${sen.first_name} ${sen.last_name}`);
  const defaultImg = `https://www.congress.gov/img/member/${sen.id.toLowerCase()}.jpg`;
  console.log(sen_name);
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${sen_name}&format=json&prop=pageimages&origin=*`
      )
      .then(({ data }) => {
        console.log(data);
        const result = data.query.pages;
        let thumbnail = result[Object.keys(result)[0]].thumbnail;
        let pic_url = thumbnail ? thumbnail.source : defaultImg;
        pic_url = pic_url.replace(/\d+px/, "500px");
        resolve(pic_url);
      });
  }).catch(e => reject(e));
};

module.exports = getSenImg;
