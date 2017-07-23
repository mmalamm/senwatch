import renderTwTimeline from './render_tw_timeline';
import renderSenInfo from './render_sen_info';
import renderDTweets from './render_d_tweets';
import bannerColor from './banner_color';

const renderBanner = (num, sen) => {
  ///////////////
  sen.office = sen.office ? sen.office : '';
  //////////////

  let btnDiv = $(`.btnDiv${num}`);
  btnDiv.empty().append(
    `
    <div>
      <div style='background-color: ${bannerColor(sen.party)}' id='sen-info-container-${num}'></div>

      <div style='border: 10px solid ${bannerColor(sen.party)};background-color:${bannerColor(sen.party)}'  id='twitter-timeline-container-${num}'></div>

      <div style='background-color: ${bannerColor(sen.party)}' id='d-tweets-container-${num}'></div>

    </div>
    `
  );
  // renderTwTimeline(num, sen.twitter_account);
  renderSenInfo(num, sen);
  // renderDTweets(num, sen.twitter_account);
};

export default renderBanner;
