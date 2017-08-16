const formatSec = sec => {
  let yearInSecs = 31536000,
    monthInSecs = 2592000,
    weekInSecs = 604800,
    dayInSecs = 86400,
    hourInSecs = 3600,
    minuteInSecs = 60;
  let years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0;

  while (sec > 0) {
    if (sec > yearInSecs) {
      years++;
      sec -= yearInSecs;
    } else if (sec > monthInSecs) {
      months++;
      sec -= monthInSecs;
    } else if (sec > weekInSecs) {
      weeks++;
      sec -= weekInSecs;
    } else if (sec > dayInSecs) {
      days++;
      sec -= dayInSecs;
    } else if (sec > hourInSecs) {
      hours++;
      sec -= hourInSecs;
    } else if (sec > minuteInSecs) {
      minutes++;
      sec -= minuteInSecs;
    } else {
      seconds += sec;
      sec -= sec;
    }
  }

  let times = [years, months, weeks, days, hours, minutes, seconds];

  if (times[0]) return `${times[0]}y`;
  if (times[1]) return `${times[1]}mo`;
  if (times[2]) return `${times[2]}w`;
  if (times[3]) return `${times[3]}d`;
  if (times[4]) return `${times[4]}h`;
  if (times[5]) return `${times[5]}min`;
  if (times[6]) return `${times[6]}s`;
};

const renderDTweets = (num, sen) => {
  $.ajax({
    url: `./api/dtweets/${sen.twitter_account}`,
    beforeSend: xhr => {
      xhr.setRequestHeader('bovine', 'corvus');
    },
    success: data => {
      sen.dTweets = data;
      if (data.length === 0) {
        return $(`#d-tweets-container-${num}`).append(
          $(
            `<div class='top-text'>No Deleted Tweets Found... maybe Senator ${sen.last_name} hasn't deleted any tweets?</div>`
          )
        );
      }
      let dTweetsList = '<div class="d-tweets">';
      let heading = `
        <div class='top-text'>
          <strong>
            Deleted Tweets
          </strong>
        </div>
      `;
      dTweetsList += heading;
      data.forEach(dTweet => {
        let createdAtObj = new Date(dTweet.created_at);
        let createdAtDate = createdAtObj.toLocaleDateString();
        let createdAtTime = createdAtObj.toLocaleTimeString();
        let deletedAtObj = new Date(dTweet.deleted_at);
        let deletedAtDate = deletedAtObj.toLocaleDateString();
        let deletedAtTime = deletedAtObj.toLocaleTimeString();
        let lifespan = (deletedAtObj.getTime() - createdAtObj.getTime()) / 1000;

        if (dTweet.body.includes('XSS')) dTweet.body = '[?]';

        dTweetsList += `
          <div class="d-tweet">
            <div class "d-tweet-img-container">
              <br>
              <img class="d-tweet-img" src=${dTweet.profile_pic_url} alt="${dTweet.name}"/>
            </div>
            <div>
              <p>
              <img class='nav_logo' src='images/twitter_logo_blue.svg' />
              ${dTweet.name} <span>@${dTweet.tw_user_name}</span>
              </p>
              <p class='tweet-body'>${dTweet.body}</p>
              <p>${createdAtTime} ${createdAtDate} (${formatSec(
          (Date.now() - createdAtObj) / 1000
        )} ago)</p>
              <p style='color:red;'>Deleted: ${deletedAtTime} ${deletedAtDate} (lifespan: ${formatSec(
          lifespan
        )})</p>
            </div>
          </div>
        `;
      });
      dTweetsList += '</div>';
      dTweetsList += `
        <div class="top-text">
          Sourced from <a href='https://projects.propublica.org/politwoops/'>Politwoops</a>
        </div>
      `;
      return $(`#d-tweets-container-${num}`).append($(dTweetsList));
    }
  });
};

export default renderDTweets;
