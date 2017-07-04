
// twitter corrections
const corrections = (sen) => {
  if (sen.twitter_account == 'RepToddYoung') sen.twitter_account = 'SenToddYoung';
  if (sen.twitter_account == 'SenFranken') sen.twitter_account = 'AlFranken';
  if (sen.twitter_account == 'SenKamalaHarris') sen.twitter_account = 'KamalaHarris';
  if (sen.twitter_account == 'SenJohnKennedy') sen.twitter_account = 'JohnKennedyLA';
  if (sen.twitter_account == 'SenatorStrange') sen.twitter_account = 'LutherStrange';
  if ((sen.first_name +' '+ sen.last_name) == 'Bill Cassidy') sen.twitter_account = 'BillCassidy';
  if ((sen.first_name +' '+ sen.last_name) == 'Amy Klobuchar') sen.twitter_account = 'AmyKlobuchar';
  if ((sen.first_name +' '+ sen.last_name) == 'Rand Paul') sen.twitter_account = 'RandPaul';
}

exports.corrections = corrections;
