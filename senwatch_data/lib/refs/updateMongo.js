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
const secrets = require("../../../secrets");
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
const fs = require("fs"),
  path = require("path");

const getLatestSensJson = () =>
  require(path.join(
    "..",
    "jsons",
    fs
      .readdirSync("./jsons")
      .sort((a, b) => +a.slice(5) - +b.slice(5))
      .pop()
  )).sens;

const createSenObj = rawSen => {
  const {
    id: pp_id,
    first_name,
    middle_name,
    last_name,
    party,
    twitter_account,
    facebook_account,
    rss_url,
    crp_id,
    crp,
    url: domain,
    next_election,
    phone,
    fax,
    state,
    state_rank,
    senate_class,
    date_of_birth: dob,
    gender,
    img_url,
    office,
    votes_with_party_pct,
    roles
  } = rawSen;
  console.log(pp_id, first_name, last_name);
  const { committees } = roles[0];
  return {
    pp_id,
    first_name,
    middle_name,
    last_name,
    party,
    twitter_account,
    facebook_account,
    rss_url,
    crp_id,
    crp,
    domain,
    next_election,
    phone,
    fax,
    state,
    state_rank,
    senate_class,
    dob,
    gender,
    img_url,
    office,
    votes_with_party_pct,
    committees,
    updated_at: Date.now().toString()
  };
};

const isSenInMongo = async sen => {
  const mClient = await MongoClient.connect(secrets.mongoUrl);
  const sensRef = await mClient.db().collection("Sens");
  const output = await sensRef.find({ pp_id: sen.id }).toArray();
  mClient.close();
  return Boolean(output.length);
};

const updateSen = async sen => {
  const mClient = await MongoClient.connect(secrets.mongoUrl);
  const sensRef = await mClient.db().collection("Sens");
  sensRef
    .findOneAndUpdate({ pp_id: sen.id }, { $set: createSenObj(sen) })
    .then(val => {
      console.log("done!!");
      console.log(val);
      mClient.close();
    })
    .catch(e => {
      console.log("error has been cought......", e);
    });
};

const updateMongo = updatedSens => {
  MongoClient.connect(secrets.mongoUrl)
    .then(async val => {
      const sensRef = val.db().collection("Sens");
      const sens = await sensRef.find().toArray();
      console.log(sens);
    })
    .catch(e => console.error(e));
};

const sensNotInDb = async sens => {
  const promises = sens.map(async s => {
    const b = await isSenInMongo(s);
    // console.log(b, s.last_name);
    return b ? false : s;
  });

  const arr = await Promise.all(promises);
  return arr.filter(x => !!x);
};

// sensNotInDb(getLatestSensJson());

const getSensString = o =>
  `${o.first_name} ${o.last_name} (${o.state}-${o.party}) [${o.id}]`;

// const dougJones = getLatestSensJson().filter(s => s.last_name === "Jones");

// const dog = async () => await isSenInMongo(dougJones);

// dog().then(b => console.log(b));
const sens = getLatestSensJson();

const insertNewSens = async () => {
  const newSens = await sensNotInDb(sens);
  const mClient = await MongoClient.connect(secrets.mongoUrl);
  const sensRef = mClient.db().collection("Sens");

  newSens.forEach(s => {
    const prunedSen = createSenObj(s);
    sensRef.insertOne(prunedSen).then(v => console.log("worked::", v));
  });
};

const updateSens = sens => {
  const promises = sens.map(s => updateSen(s));
  return Promise.all(promises);
};

updateSens(sens).then(() => console.log("done!!!!!"));
// const saveOldSens = () => {
//   console.log("making senwatchv0 call...");
//   return axios({
//     url: "http://senwatch.us/api/sens",
//     method: "GET"
//   }).then(({ data }) => saveFileJson(data, `oldSens.json`));
// };
