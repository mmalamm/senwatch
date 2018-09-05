const axios = require("axios");
const openSecretsKey = require("../../secrets").openSecretsKey;

const merge = require("lodash/merge");

const getSenCrpIndustries = sen => {
  const callUrl = `http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${
    sen.crp_id
  }&apikey=${openSecretsKey}`;
  sen.crp = sen.crp || {};
  return new Promise((resolve, reject) => {
    axios
      .get(callUrl)
      .then(({ data }) => {
        const { industries } = data.response;
        sen.crp = merge(sen.crp, { candIndustry: industries });
        console.log(sen.last_name + " fetched");
        resolve(sen);
      })
      .catch(error => resolve(merge(sen, { crp: "crp_not_found" })));
  });
};

module.exports = getSenCrpIndustries;
