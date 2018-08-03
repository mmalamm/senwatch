import stateHash from './state_map_hashes';
const { state_ids_obj, state_hash } = stateHash;
import renderBanner from '../banners/render_banner';

let tooltip = d3
  .select('body')
  .append('div')
  .style('position', 'absolute')
  .style('background', '#002b55')
  .style('padding', '5px 15px')
  .style('border', '1px #999999 solid')
  .style('opacity', '0')
  .style('border-radius', '5px')
  .style('transition', 'opacity 0.3s ease');

// attach to states paths in map_render
const cursor_events = {
  handleHoverOn: e => {
    e.target.style.transition = 'fill 0.2s ease';
    e.target.style.fill = '#FFFC61';
    e.target.style.cursor = 'pointer';
    tooltip.transition().style('opacity', 1);
    tooltip
      .html(state_hash[e.target.state_abbr])
      .style('pointer-events', 'none')
      .style('left', e.pageX - 50 + 'px')
      .style('top', e.pageY + 50 + 'px');
  },

  handleHoverOff: e => {
    e.target.style.fill = e.target.color;
    tooltip.transition().style('opacity', 0);
  },

  handleFocus: e => {
    e.target.style.fill = '#C7C44B';
    e.target.style.outline = 'none';
  },

  handleClick: e => {
    document.getElementById('sens-info').scrollIntoView();
    let stateName = e.target.state_abbr;
    let sens = senators.filter(senator => senator.state === stateName);
    $('#heading')
      .empty()
      .append(`<h1 id='heading'>${state_hash[stateName]} Senators</h1>`);
    renderBanner(0, sens.filter(sen => sen.state_rank == 'junior')[0]);
    renderBanner(1, sens.filter(sen => sen.state_rank == 'senior')[0]);
  }
};

export default cursor_events;
