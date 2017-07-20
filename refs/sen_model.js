///////////////////////////////////////
// frontend model:
senModel = {
  //propublica api call 1
  pp_id: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  party: char,
  twitter_account: string,
  facebook_account: string,
  rss_url: string,
  crp_id: string,
  domain: string,
  next_election: string,
  office: string,
  phone: string,
  fax: string,
  state: string,
  state_rank: string,
  senate_class: char,
  // added each call [not in db]
  missed_votes_pct: float,
  votes_with_party_pct: float,
  total_votes: int,
  missed_votes: int,
  total_present: int,

  //propublica api call 2
  dob: string,
  gender: char,
  committees: array,
  committee_model: {

  },

  //propublica api call 3 [not in db]
  votes: array,
  vote_model: {

  },

  //polititwoops api call 4 [not in db]
  d_tweets: array,
  d_tweet_model: {
    created_at: tw.created_at,
    deleted_at: tw.updated_at,
    body: tw.content,
    profile_pic_url: tw.details.user.profile_image_url,
    tw_user_name: tw.user_name
  },

  //wikipedia api call 5
  img_url: str,

  //opensecrets api call 6
  crp: object,

};




///////////////////////////////////////////
// db model:
senDBmodel = {
  //ppMcall
  pp_id: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  party: char,
  twitter_account: string,
  facebook_account: string,
  rss_url: string,
  crp_id: string,
  domain: string,
  next_election: string,
  phone: string,
  fax: string,
  state: string,
  rank: string,
  senate_class: char,

  //pp2req
  dob: string,
  gender: char,
  committees: array,
  committee_model: {

  },

  //wikipedia api call 5
  img_url: str,

  //opensecrets api call 6
  crp: object,
};
