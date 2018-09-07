// create updated sens objects

/**
 * x make main call
 * x make secondary call
 * x make pictures call
 *  make crp call
 *  prune data
 *  update mongo
 *
 */

const axios = require("axios");
const secrets = require("../../secrets");
const merge = require("lodash/merge");
const getSenImg = require("./getSenImg");
const saveFileJson = require("./saveFileJson");
const saveSensJson = require("./saveSensJson");
const getSenCrpIndustries = require("./getSenCrpIndustries");
const ppMainUrl =
  "https://api.propublica.org/congress/v1/115/senate/members.json";
const MongoClient = require("mongodb").MongoClient;

const pp1Call = () => {
  console.log("making pp1 call...");
  return axios({
    url: ppMainUrl,
    method: "GET",
    headers: secrets.propublicaHeader
  }).then(data => data.data.results[0].members.filter(mem => mem.in_office));
};

const pp2Call = async sen => {
  console.log("making pp2 call for:", sen.id);
  const url = `https://api.propublica.org/congress/v1/members/${sen.id}.json`;
  return axios({
    url,
    method: "GET",
    headers: secrets.propublicaHeader
  }).then(data => merge(sen, data.data.results[0]));
};

const debouncer = fn => arr => {
  return Promise.all(
    arr.map(s1 => {
      return new Promise((resolve, reject) => {
        const randomMs = Math.floor(Math.random() * 5000);
        console.log(`calling ${s1.last_name} in ${randomMs} ms...`);
        setTimeout(() => fn(s1).then(s2 => resolve(merge(s1, s2))), randomMs);
      });
    })
  );
};

const updateImgUrls = async sens => {
  const promises = sens.map(s => getSenImg(s));
  const urls = await Promise.all(promises);
  return urls.map((u, i) => {
    const obj = { img_url: u };
    return merge(sens[i], obj);
  });
};

const getSens = () => {
  return pp1Call()
    .then(debouncer(pp2Call))
    .then(updateImgUrls)
    .then(saveSensJson);
};

const getCrpUpdate = sens => {
  return Promise.all(sens.map(getSenCrpIndustries)).then(crpSens => {
    saveSensJson(crpSens);
    saveFileJson(crpSens, "crpSens.json");
  });
};

// getSens();
// const sss = require("../jsons/sens-1536122052639.json");
// getCrpUpdate(sss.sens);
const fs = require("fs");

const getLatestSensJson = () =>
  fs
    .readdirSync("./jsons")
    .sort((a, b) => +a.slice(5) - +b.slice(5))
    .pop();

(ss => {
  MongoClient.connect(secrets.mongoUrl)
    .then(async val => {
      const sens = await val.db().collection('Sens').find().toArray();
      console.log(sens);
    })
    .catch(e => console.error(e));
})(getLatestSensJson());
