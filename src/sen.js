const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SenSchema = new Schema({
  pp_id: String,
  first_name: String,
  middle_name: String,
  last_name: String,
  party: String,
  twitter_account: String,
  facebook_account: String,
  rss_url: String,
  crp_id: String,
  crp: String,
  domain: String,
  next_election: String,
  total_votes: Number,
  missed_votes: Number,
  missed_votes_pct: Number,
  votes_with_party_pct: Number,
  dob: String,
  gender: String,
  committees: String,
  votes: String,
  d_tweets: String,
  img_url: String
});

const Sen = mongoose.model('sen', SenSchema);

module.exports = Sen;
