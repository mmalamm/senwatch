const rendercrpViz = (num, crp) => {
  let data = crp.candIndustry.industry.map( ind => {
    let name = ind["@attributes"].industry_name;
    let total = Number(ind["@attributes"].total);
    let pacs =  Number(ind["@attributes"].pacs);
    let indivs = Number(ind["@attributes"].indivs);
    return {name,total,pacs,indivs};
  });
  // return $(`#crp-viz-${num}`).append($(`<h1>${data[0].name}</h1>`));
  let wits = data.map( ind => ind.total );
//this appends svg el
let w = 460;
let h = 200;
let svg = d3.select(`#crp-viz-container-${num}`).append('svg')
  .attr('id', 'chart')
  .attr('height', h)
  .attr('width', w);

// this creates the axis scales
let x = d3.scaleLinear()
  .domain([0, d3.max(wits)])
  .range([0, w]);
let y = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, h]);

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
      .attr('y', (d, i) => y(i) )
      .attr('dy', () => y(1)/1.5+2 )
      .attr('style', 'pointer-events:none')
      .text( d => d.name );
};


 return plot({data, svg});
};

export default rendercrpViz;
