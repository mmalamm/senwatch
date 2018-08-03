import bannerColor from './banner_color';
import personalInfo from './personal_info';

const renderSenInfo = (num, sen) => {
  let rank = sen.state_rank[0].toUpperCase() + sen.state_rank.slice(1);
  let infoTemplate = `<div class='btn-contents'>
    <img height='240px' width='auto' class='sen-img' src=${sen.img_url} id='sen-img-${num}' style='border: 10px solid ${bannerColor(sen.party)}' />
    <p id='sen-info'><strong>${sen.first_name} ${sen.last_name} (${sen.party}-${sen.state})</strong>
      <br>
      ${rank} Senator
      <br>
      ${personalInfo(sen)}
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
    </p>
  </div>`;
  return $(`#sen-info-container-${num}`).append($(infoTemplate));
};

export default renderSenInfo;
