const rendercrpViz = (num, crp) => {
  if(!crp.candIndustry) return console.log('no crp on file');

  $(`#crp-viz-container-${num}`).append(`<div class="top-text"><strong>Top Donors by Industry</strong></div><div id='chart-container-${num}'></div>`);

  let data = crp.candIndustry.industry.map( ind => {
    let name = ind["@attributes"].industry_name;
    let total = Number(ind["@attributes"].total);
    let pacs =  Number(ind["@attributes"].pacs);
    let indivs = Number(ind["@attributes"].indivs);
    return {name,total,pacs,indivs};
  });
  // return $(`#crp-viz-${num}`).append($(`<h1>${data[0].name}</h1>`));
  //this appends svg el
  let w = 460;
  let h = 400;

  let margin = {
    top: 20,
    bottom: 20,
    left:20,
    right:20
  };

  let width = w - margin.left - margin.right;
  let height = h - margin.top - margin.bottom;

  let svg = d3.select(`#chart-container-${num}`).append('svg')
  .attr('id', 'chart')
  .attr('height', h)
  .attr('width', w);

  let chart = svg.append('g')
              .classed('display', true)
              .attr('transform', `translate(${margin.left},${margin.top})`);

// this creates the axis scales
  let x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.total)])
    .range([0, width]);
  let y = d3.scaleLinear()
    .domain([0, data.length])
    .range([0, height]);

// this makes the bars and labels
  const plot = (params) => {

    params.svg.selectAll('.bar')
      .data(params.data)
      .enter()
        .append('rect')
        .classed('bar', true)
        .attr('x', 0)
        .attr('y', (d, i) => y(i) )
        .attr('width', d => x(d.total) )
        .attr('height', () => y(1)-1 );

    params.svg.selectAll('.bar-label')
      .data(params.data)
      .enter()
        .append('text')
        .classed('bar-label', true)
        .attr('x', /*d => x(d.total/5000)*/0 )
        .attr('dx', 5)
        .attr('y', (d, i) => y(i) )
        .attr('dy', () => y(1)/1.5+2 )
        .attr('style', 'pointer-events:none')
        .text( d => d.name );

  };

  $(`#crp-viz-container-${num}`).append(`<div class="top-text">
    Sourced from <a href='https://www.opensecrets.org/'>Center For Responsive Politics</a>
  </div>`);
  return plot({data, svg:chart});
};

export default rendercrpViz;
