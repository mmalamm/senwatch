const axios = require("axios");
const openSecretsKey = require("../../secrets").openSecretsKey;

const merge = require("lodash/merge");

const callUrl = `http://www.opensecrets.org/api/?method=candIndustry&output=json&cid=${
  sen.crp_id
}&apikey=${openSecretsKey}`;

const getSenCrpIndustries = sen => {
  sen.crp = sen.crp || {};
  return new Promise((resolve, reject) => {
    axios
      .get(callUrl)
      .then(({ data }) => {
        const { industries } = data.response;
        sen.crp = merge(sen.crp, { candIndustry: industries });
        resolve(sen);
      })
      .catch(error => reject(error));
  });
};

module.exports = getSenCrpIndustries;
