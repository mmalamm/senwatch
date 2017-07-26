import renderTwTimeline from './render_tw_timeline';
import renderSenInfo from './render_sen_info';
import renderDTweets from './render_d_tweets';
import rendercrpViz from './render_crp_viz';
import bannerColor from './banner_color';

import cursorEvents from './cursor_events';
const { personalInfoHover, personalInfoOff, openTab } = cursorEvents;

const renderBanner = (num, sen) => {
  ///////////////
  sen.office = sen.office ? sen.office : '';
  //////////////

  let btnDiv = $(`.btnDiv${num}`);
  btnDiv.empty().append(
    `
    <div style='background-color: ${bannerColor(sen.party)}'>
      <div id='sen-info-container-${num}'></div>

      <div class="tab">
        <button id='crp-viz-tab-${num}' class="tablinks">$$$</button>
        <button id='twitter-timeline-tab-${num}' class="tablinks">Tweets</button>
        <button id='d-tweets-tab-${num}' class="tablinks">dTweets</button>
        <button id='votes-tab-${num}' class="tablinks">votes</button>
      </div>

      <div id='crp-viz-container-${num}' class='tab-content active-${num}'></div>

      <div style='border: 10px solid ${bannerColor(sen.party)}'  id='twitter-timeline-container-${num}' class='tab-content '></div>

      <div id='d-tweets-container-${num}' class='tab-content'></div>

      <div id='votes-container-${num}' class='tab-content'></div>

    </div>
    `
  );

  renderSenInfo(num, sen);
  rendercrpViz(num, sen.crp);
  renderTwTimeline(num, sen.twitter_account);
  renderDTweets(num, sen.twitter_account);

  // attach cursor events
  let zods = Array.from($('.zodiac'));
  zods.forEach( zod => {
    zod.onmouseover = personalInfoHover;
    zod.onmouseout = personalInfoOff;
  });

  let tabs = Array.from($('.tablinks'));
  console.log(tabs);
  tabs.forEach( tab => {
    tab.onclick = openTab;
  });
};

export default renderBanner;
