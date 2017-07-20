const statesGeoJSON = 'https://d3js.org/us-10m.v1.json';

const svg = d3.select("svg");

const path = d3.geoPath();

d3.json(statesGeoJSON, (error, us) => {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);

  const state_ids_obj = { 0: "AR", 1: "CA", 2: "IL", 3: "KS", 4: "MS", 5: "OH", 6: "TX", 7: "AL", 8: "IA", 9: "LA", 10: "MN", 11: "MO", 12: "NE", 13: "AZ", 14: "CO", 15: "IN", 16: "MI", 17: "MT", 18: "NY", 19: "OR", 20: "VA", 21: "WY", 22: "NC", 23: "OK", 24: "TN", 25: "WI", 26: "AK", 27: "VT", 28: "ND", 29: "GA", 30: "ME", 31: "RI", 32: "WV", 33: "ID", 34: "SD", 35: "NM", 36: "WA", 37: "PA", 38: "FL", 39: "UT", 40: "KY", 41: "NH", 42: "SC", 43: "NV", 44: "HI", 45: "NJ", 46: "CT", 47: "MD", 48: "MA", 49: "DE", 50: "DC"};
  const state_hash = { "AL": "Alabama", "AK": "Alaska", "AZ": "Arizona", "AR": "Arkansas", "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware", "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "IA": "Iowa", "KS": "Kansas", "KY": "Kentucky", "LA": "Louisiana", "ME": "Maine", "MD": "Maryland", "MA": "Massachusetts", "MI": "Michigan", "MN": "Minnesota", "MS": "Mississippi", "MO": "Missouri", "MT": "Montana", "NE": "Nebraska", "NV": "Nevada", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico", "NY": "New York", "NC": "North Carolina", "ND": "North Dakota", "OH": "Ohio", "OK": "Oklahoma", "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina", "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah", "VT": "Vermont", "VA": "Virginia", "WA": "Washington", "WV": "West Virginia", "WI": "Wisconsin", "WY": "Wyoming", "DC": "Washington D.C."};

  const handleHoverOn = (e) => {
    e.target.style.transition = 'fill 0.2s ease';
    e.target.style.fill = '#FFFC61';
    e.target.style.cursor = 'pointer';
    tooltip.transition().style('opacity',1);
        tooltip.html(state_hash[e.target.state_abbr])
        .style('pointer-events', 'none')
        .style('left',(e.pageX - 50)+'px')
        .style('top',(e.pageY + 50)+'px');
  };

  const handleHoverOff = (e) => {
    e.target.style.fill = e.target.color;
    tooltip.transition().style('opacity',0);
  };

  const handleFocus = (e) => {
    e.target.style.fill = '#C7C44B';
    e.target.style.outline = 'none';
  };

  let mmm = Array.from($(".states")[0].children);
  let iter = 0;
  mmm.forEach( state => {
    state.special_id = iter;
    iter ++;
    state.state_abbr = state_ids_obj[state.special_id];
    // state.onclick = handleClick;
    state.onmouseover = handleHoverOn;
    state.onmouseout = handleHoverOff;
    state.onfocus = handleFocus;
  });

  let tooltip = d3.select('body')
                      .append('div')
                      .style('position','absolute')
                      .style('background','#002b55')
                      .style('padding','5px 15px')
                      .style('border','1px #999999 solid')
                      .style('opacity','0')
                      .style('border-radius', '5px')
                      .style('transition', 'opacity 0.3s ease');

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
});
