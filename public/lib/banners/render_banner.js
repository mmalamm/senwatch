import renderTwTimeline from './render_tw_timeline';
import renderSenInfo from './render_sen_info';
import renderDTweets from './render_d_tweets';
import rendercrpViz from './render_crp_viz';
import bannerColor from './banner_color';

import cursorEvents from './cursor_events';
const { personalInfoHover, personalInfoOff } = cursorEvents;

const renderBanner = (num, sen) => {
  ///////////////
  sen.office = sen.office ? sen.office : '';
  //////////////

  let btnDiv = $(`.btnDiv${num}`);
  btnDiv.empty().append(
    `
    <div>
      <div style='background-color: ${bannerColor(sen.party)}' id='sen-info-container-${num}'></div>

      <div style='background-color: ${bannerColor(sen.party)}' id='crp-viz-${num}'></div>

      <div style='border: 10px solid ${bannerColor(sen.party)};background-color:${bannerColor(sen.party)}'  id='twitter-timeline-container-${num}'></div>

      <div style='background-color: ${bannerColor(sen.party)}' id='d-tweets-container-${num}'></div>


    </div>
    `
  );

  renderSenInfo(num, sen);
  rendercrpViz(num, sen.crp);
  renderTwTimeline(num, sen.twitter_account);
  // renderDTweets(num, sen.twitter_account);

  // attach cursor events
  let zods = Array.from($('.zodiac'));
  zods.forEach( zod => {
    zod.onmouseover = personalInfoHover;
    zod.onmouseout = personalInfoOff;
  });
};

export default renderBanner;
