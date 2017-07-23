const statesGeoJSON = 'https://d3js.org/us-10m.v1.json';

const svg = d3.select("svg");

const path = d3.geoPath();

import ppMCall from './ppM_call.js';

import cursorEvents from './cursor_events';
const { handleHoverOn, handleHoverOff, handleFocus, handleClick } = cursorEvents;

import stateHash from './state_map_hashes';
const { state_ids_obj, state_hash } = stateHash;

d3.json(statesGeoJSON, (error, us) => {
  if (error) throw error;

  svg.append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter().append("path")
      .attr("d", path);

  let mmm = Array.from($(".states")[0].children);
  let iter = 0;

  mmm.forEach( state => {
    state.special_id = iter;
    iter ++;
    state.state_abbr = state_ids_obj[state.special_id];

    state.onclick = handleClick;
    state.onmouseover = handleHoverOn;
    state.onmouseout = handleHoverOff;
    state.onfocus = handleFocus;
  });

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

  ppMCall();
});
