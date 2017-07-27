const renderVotes = (num, pp_id) => {
  $.ajax({
    url: `./api/sens/${pp_id}/votes`,
    beforeSend: xhr => xhr.setRequestHeader('bovine', 'corvus'),
    success: data => {
      let voteList = '<div class="votes">';
      let heading = `
        <div class='top-text'>
          <strong>
            Latest Votes
          </strong>
        </div>
      `;
      voteList += heading;
      data.forEach( (vote, idx) => {
        if (idx == 3) console.log(vote);
      });

      voteList += '</div>';

      return $(`#votes-container-${num}`).append($(voteList));
    }
  });
};

export default renderVotes;
