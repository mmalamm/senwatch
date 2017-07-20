const renderDTweets = (num, twAcc) => {
  $.ajax({
    url: `./api/dtweets/${twAcc}`,
    beforeSend: (xhr) => {
      xhr.setRequestHeader('bovine', 'corvus');
    },
    success: (data) => {
      let dTweetsList = '<div class="d-tweets">';
      data.forEach( dTweet => {
        dTweetsList += `
          <div class="d-tweet">
            <div class "d-tweet-img-container">
              <br>
              <br>
              <img class="d-tweet-img" src=${dTweet.profile_pic_url} alt=${dTweet.name}/>
            </div>
            <div>
              <p>
              <img class='nav_logo' src='images/twitter_logo.svg' />
              ${dTweet.name} <span>@${dTweet.tw_user_name}</span>
              </p>
              <p>${dTweet.body}</p>
              <p>${dTweet.created_at}, ${dTweet.deleted_at}</p>
            </div>
          </div>
        `;
      });
      dTweetsList += '</div>';
      return $(`#d-tweets-container-${num}`).append($(dTweetsList));
    }
  });
};

export default renderDTweets;
