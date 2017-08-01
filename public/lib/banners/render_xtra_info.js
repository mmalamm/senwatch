const renderXtraInfo = (num, sen) => {
  let commsStr = sen.committees.length ?
    '<div class="top-text"><strong>Committee Memberships:</strong></div>' : '';
  sen.committees.forEach( (committee) => {
    commsStr += `<div>${committee.name}</div>`;
  });
  commsStr = '<div>' +commsStr+'</div>';
  return $(`#xtra-info-${num}`).append($(commsStr));
};

export default renderXtraInfo;
