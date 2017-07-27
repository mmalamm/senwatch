const renderVotes = (num, sen) => {
  $.ajax({
    url: `./api/sens/${sen.pp_id}/votes`,
    beforeSend: xhr => xhr.setRequestHeader('bovine', 'corvus'),
    success: data => {
      sen.votes = data;
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
        if(idx===0||idx===1) console.log(vote);
        let infoLink = `https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=${vote.congress}&session=${vote.session}&vote=00${vote.roll_call}`;
        voteList += `
          <div class="vote">
            <h6>Roll Call ${vote.roll_call}:</h6>
            <h4>${vote.description}</h4>
            <p>${vote.question}</p>
            <div>
              <p>Position: ${vote.position}</p>
              <p>Result: ${vote.result}</p>
              <p><a href=${infoLink} target="_blank">Vote Info</a></p>
            </div>
          </div>
        `;
      });

      voteList += '</div>';

      return $(`#votes-container-${num}`).append($(voteList));
    }
  });
};

export default renderVotes;
