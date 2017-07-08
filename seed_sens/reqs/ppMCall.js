const fs = require ('fs'),
  os = require('os'),
  request = require('request'), chalk = require('chalk');

const sec = require('./secrets');
let ppHeadersObj = sec.secrets.ppHeader || 'nunya';

let ppCallResult;
const result = { sens:[] };

let callUrl = {
  url : 'https://api.propublica.org/congress/v1/115/senate/members.json',
  headers : ppHeadersObj
};

const corrections = require('../helpers/corrections');

let callback = function (error, response, body) {
  console.log(chalk.blue('statusCode for main PP call:', response && response.statusCode));

  if (response.statusCode <= 200) {

    ppCallResult = JSON.parse(body);

    let mems = ppCallResult.results[0].members.filter(mem=>mem.in_office == 'true');
    mems.forEach( mem => {
      corrections.corrections(mem);

      result.sens.push({
        pp_id: mem.id,
        first_name: mem.first_name,
        middle_name: mem.middle_name,
        last_name: mem.last_name,
        party: mem.party,
        twitter_account: mem.twitter_account,
        facebook_account: mem.facebook_account,
        rss_url: mem.rss_url,
        crp_id: mem.crp_id,
        crp: {},
        domain: mem.domain,
        next_election: mem.next_election,
        total_votes: mem.total_votes,
        missed_votes: mem.missed_votes,
        total_present: mem.total_present,
        phone: mem.phone,
        fax: mem.fax,
        state: mem.state,
        rank: mem.state_rank,
        missed_votes_pct: mem.missed_votes_pct,
        votes_with_party_pct: mem.votes_with_party_pct
      });
    });

    result.pp2i = [];
    const pp2req = require('./pp2req');
    const pp2i = result.pp2i;
    result.sens.forEach( (sen) => {
      pp2req.pp2req(sen, pp2i);
    });

    result.pp3i = [];
    const pp3req = require('./pp3req');
    const pp3i = result.pp3i;
    result.sens.forEach( (sen) => {
      pp3req.pp3req(sen, pp3i);
    });

    result.dTweetsi = [];
    const dTweetsReq = require('./dTweetsReq');
    const dTweetsi = result.dTweetsi;
    result.sens.forEach( (sen) => {
      dTweetsReq.dTweetsReq(sen, dTweetsi);
    });

    // result.crpi = [];
    // const crpReq = require('./crpReq');
    // const crpi = result.crpi;
    // result.sens.forEach( (sen) => {
    //   crpReq.crpReq(sen, crpi);
    // });

    result.wikii = [];
    const wikiReq = require('./wikiReq');
    const wikii = result.wikii;
    result.sens.forEach( (sen) => {
      wikiReq.wikiReq(sen, wikii);
    });

  } else {

    const logError = require('../helpers/error_logger.js');
    logError.logError('ppMCall', null, response);

  }
};

const ppMCall = () => {
  return request(callUrl, callback);
};

exports.ppMCall = ppMCall;
exports.result = result;