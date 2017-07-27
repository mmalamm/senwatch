const renderDTweets = (num, sen) => {
  $.ajax({
    url: `./api/dtweets/${sen.twitter_account}`,
    beforeSend: (xhr) => {
      xhr.setRequestHeader('bovine', 'corvus');
    },
    success: (data) => {
      sen.dTweets = data;
      let dTweetsList = '<div class="d-tweets">';
      let heading = `
        <div class='top-text'>
          <strong>
            Deleted Tweets
          </strong>
        </div>
      `;
      dTweetsList += heading;
      data.forEach( dTweet => {

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
              <img class="d-tweet-img" src=${dTweet.profile_pic_url} alt=${dTweet.name}/>
            </div>
            <div>
              <p>
              <img class='nav_logo' src='images/twitter_logo_blue.svg' />
              ${dTweet.name} <span>@${dTweet.tw_user_name}</span>
              </p>
              <p>${dTweet.body}</p>
              <p>${createdAtTime} ${createdAtDate}</p>
              <p style='color:red;'>Deleted: ${deletedAtTime} ${deletedAtDate} (lifespan: ${lifespan} seconds)</p>
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
