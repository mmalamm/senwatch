// create updated sens objects

/**
 *  make main cal
 *  make secondary calll
 *  make crp call
 *
 */

const axios = require("axios");
const secrets = require("../../secrets");
const merge = require("lodash/merge");
const getSenImg = require("./getSenImg");
const fs = require("fs");
const saveSensJson = require("./saveSensJson");
const ppMainUrl =
  "https://api.propublica.org/congress/v1/115/senate/members.json";

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

const getSens = async () => {
  const sens = await pp1Call();

  const debouncer = arr => fn => {
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

  return debouncer(sens)(pp2Call);
  // const promises = sens.map(pp2Call);
  // return (
  //   Promise.all(promises)
  // .then(updatedSens =>
  //   updatedSens.map(async uSen =>
  //     merge(uSen, { img_url: await getSenImg(uSen) })
  //   )
  // )
  // .catch(e => console.error(e))
  // );
};

// update mongodb with updated object
// getSens()
//   .then(d => {
//     fs.writeFile(
//       "sens.json",
//       JSON.stringify({ created_at: Date(Date.now()), sens: d }),
//       err => {
//         if (err) throw err;
//         console.log("The file has been saved!");
//       }
//     );
//   })
//   .catch(e => console.error(e));

const sensJson = require("../sens.json");

console.log(sensJson);

const updateImgUrls = async sens => {
  const promises = sens.map(s => getSenImg(s));
  const urls = await Promise.all(promises);
  return urls.map((u, i) => {
    const obj = { img_url: u };
    return merge(sens[i], obj);
  });
};

updateImgUrls(sensJson.sens)
  .then(arr => saveSensJson(arr))
  .catch(e => console.error(e));
