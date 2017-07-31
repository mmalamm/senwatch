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
            <div class='row'>
              <div>
                <div><a href=${infoLink} target="_blank">Session: ${vote.session} Roll Call: ${vote.roll_call}</a></div>
                <div>${new Date(vote.date+' '+vote.time+' EST').toLocaleString()}</div>
                <div>
                  <h3>${vote.description}</h3>
                  <h6>${vote.question}</h6>
                </div>
              </div>
              <div id='vote-result-${vote.roll_call}-${num}' class='vote-viz'>
                <div>Result:</div>
                <p>${vote.total.yes} Yea</p>
                <p>${vote.total.no} Nay</p>
              </div>
            </div>
            <div class='row'>
              <p>Position: ${vote.position}</p>
              <p>Result: ${vote.result}</p>
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
