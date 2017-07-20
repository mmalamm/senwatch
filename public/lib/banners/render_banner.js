const renderBanner = (num, sen) => {
  ///////////////
  sen.office = sen.office ? sen.office : '';
  //////////////
  let embedCode =  `<a class="twitter-timeline"
                href="https://twitter.com/${sen.twitter_account}"
                data-tweet-limit="5">
                Tweets by ${sen.twitter_account}</a>
                <script async src="https://platform.twitter.com/widgets.js"
                charset="utf-8"></script>`;

  let commsStr = sen.committees.length ? '<div class="top-text"><strong>Committee Memberships:</strong></div>' : '';
  sen.committees.forEach( (committee) => {
    commsStr += `<div>${committee.name}</div>`;
  });
  let btnDiv = $(`.btnDiv${num}`);
  btnDiv.empty().append(
    `
    <div>
      <div style='background-color: ${bannerColor(sen.party)}' btnDiv${num}'>
        <div class='btn-contents'>
        <img height='240px' width='auto' class='sen-img' src=${sen.img_url} id='sen-img-${num}' style='border: 10px solid ${bannerColor(sen.party)}' />
        <p id='sen-info'><strong>${sen.first_name} ${sen.last_name} (${sen.party}-${sen.state})</strong>
          <br>
          <br>
          <img class='nav_logo' src='images/twitter_logo.svg' /> ${sen.twitter_account}
          <br>
          Next Election: ${sen.next_election}
          <br>
          Phone: ${sen.phone}
          <br>
          <a href='https://${sen.domain}'>${sen.domain ? sen.domain : ''}</a>
          <br>
          <br>
          Office: ${sen.office.replace('Senate Office Building', '')}
          <br>
            Senate Office Building
          <br>
          <br>
            Place Holder for latest votes Link
        </p>
      </div>
      <div class='xtra-info xtra-info-${num}'>
        <div>${commsStr}</div>
      </div>
      </div>
      <div class='tw-feed' style='border: 10px solid ${bannerColor(sen.party)};background-color:${bannerColor(sen.party)}'  id='twitter-timeline-container-${num}' >

      </div>
    </div>
    `
  );
  $(`#twitter-timeline-container-${num}`).append($(embedCode));
};

const bannerColor = (party) => {
  switch (party) {
    case 'R':
      return '#B24C63';
    case 'D':
      return '#2B5CCE';
    default:
      return '#267543';
  }
};

export default renderBanner;
