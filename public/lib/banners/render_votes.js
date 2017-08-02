const renderVotes = (num, sen) => {
  $.ajax({
    url: `./api/sens/${sen.pp_id}/votes`,
    beforeSend: xhr => xhr.setRequestHeader('bovine', 'corvus'),
    success: res => {
      sen.votes = res;
      let voteList = '<div class="votes">';
      let heading = `
        <div class='top-text'>
          <strong>
            Latest Votes
          </strong>
        </div>
      `;
      voteList += heading;
      res.forEach((vote, idx) => {
        let infoLink = `https://www.senate.gov/legislative/LIS/roll_call_lists/roll_call_vote_cfm.cfm?congress=${vote.congress}&session=${vote.session}&vote=00${vote.roll_call}`;
        voteList += `
          <div class="vote">
            <div class='row'>
              <div>
                <div><a href=${infoLink} target="_blank">Session: ${vote.session} Roll Call: ${vote.roll_call}</a></div>
                <div>${new Date(
                  vote.date + ' ' + vote.time + ' EST'
                ).toLocaleString()}</div>
                <div>
                  <h3>${vote.description}</h3>
                  <h4 style='color:#777777'>${vote.question}</h4>
                </div>
              </div>
              <div>
                <div class='vote-viz' id='vote-result-${vote.roll_call}-${num}'>
                  <div style='color:black'>Result:</div>
                </div>
              </div>
            </div>
            <div class='row vote-bot'>
              <p>Position: ${vote.position}</p>
              <p>Result: ${vote.result}</p>
            </div>
          </div>
        `;
      });

      voteList += '</div>';

      $(`#votes-container-${num}`).append($(voteList));

      res.forEach((vote, idx) => {
        let total = vote.total;
        let data = Object.keys(total).map(el => {
          let output = {};
          output.label = el;
          output.count = total[el];
          return output;
        });

        let height = 150,
          width = 150,
          radius = Math.min(width, height) / 2;

        let color = d3
          .scaleOrdinal()
          .range(['#2B5CCE', '#B24C63', '#267543', '#C7C44B']);

        let pie = d3.pie().value(d => d.count)(data);

        let arc = d3.arc().outerRadius(radius).innerRadius(0);

        let labelArc = d3
          .arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

        let svg = d3
          .select(`#vote-result-${vote.roll_call}-${num}`)
          .append('svg')
          .attr('width', width)
          .attr('height', height)
          .append('g')
          .attr('transform', `translate(${width / 2},${height / 2})`);

        let g = svg
          .selectAll('arc')
          .data(pie)
          .enter()
          .append('g')
          .attr('class', 'arc');

        g.append('path').attr('d', arc).style('fill', d => color(d.data.label));

        g
          .append('text')
          .attr('transform', d => `translate(${labelArc.centroid(d)})`)
          .text(d => {
            if (d.data.count === 0) return '';
            switch (d.data.label) {
              case 'yes':
                return 'Yes';
              case 'no':
                return 'No';
              case 'present':
                return 'Present';
              default:
                return 'Not Voting';
            }
          })
          .style('fill', 'white')
          .style('text-anchor', 'middle');
      });
    }
  });
};

export default renderVotes;

// http://blockbuilder.org/enjalot/1203641
// use as reference for vote result chart
