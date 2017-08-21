var jsdom = require('jsdom/lib/old-api.js');
const fs = require('fs');

// console.log(jsdom);
jsdom.env(
  "<html><body></body></html>",
  [ 'http://d3js.org/d3.v3.min.js' ],
  function (err, window) {
    var svg = window.d3.select("body")
        .append("svg")
        .attr("width", 100).attr("height", 100);

    svg.append("rect")
        .attr("x", 10)
        .attr("y", 10)
        .attr("width", 80)
        .attr("height", 80)
        .style("fill", "orange");
// PRINT OUT:
    console.log(window.d3.select("body").html());
    fs.writeFileSync('out.svg', window.d3.select("body").html()); // or this
  }
);


// const d3 = require('d3');
// app.get('/amp-data/crp/:pp_id', (req, res) => {
//
  // let attr = crp.candIndustry['@attributes'];
  // let candName = attr.cand_name;
  // let party = candName[candName.length - 2];
  //
  // let data = crp.candIndustry.industry.map(ind => {
  //   let name = ind['@attributes'].industry_name;
  //   let total = Number(ind['@attributes'].total);
  //   let pacs = Number(ind['@attributes'].pacs);
  //   let indivs = Number(ind['@attributes'].indivs);
  //   return { name, total, pacs, indivs };
  // });
//
//   //this appends svg el
  // let w = 460;
  // let h = 400;
  //
  // let margin = {
  //   top: 20,
  //   bottom: 20,
  //   left: 20,
  //   right: 20
  // };
  // 
  // let width = w - margin.left - margin.right;
  // let height = h - margin.top - margin.bottom;
  //
  // let colour = d3.color(bannerColor(party)).darker();
  //
  // let svg = d3
  //   .select(`#chart-container-${num}`)
  //   .append('svg')
  //   .attr('id', 'chart')
  //   .attr('height', h)
  //   .attr('width', w)
  //   .attr('style', `background:${colour}`);
  //
  // let chart = svg
  //   .append('g')
  //   .classed('display', true)
  //   .attr('transform', `translate(${margin.left},${margin.top})`);
  //
  // // this creates the axis scales
  // let x = d3
  //   .scaleLinear()
  //   .domain([0, d3.max(data, d => d.total + 50000)])
  //   .range([0, width]);
  // let y = d3.scaleLinear().domain([0, data.length]).range([0, height]);
  //
  // let xAxis = d3.axisBottom(x).ticks(10);
  // let xGridlines = () => {
  //   return d3.axisBottom(x).ticks(10);
  // };
  // // this makes the bars and labels
  // const plot = params => {
  //   params.svg
  //     .append('g')
  //     .attr('class', 'axis')
  //     .call(xAxis)
  //     .selectAll('text')
  //     .style('text-anchor', 'end')
  //     .style('pointer-events', 'none')
  //     .style('font-size', '24px')
  //     .style('fill', colour)
  //     .style('opacity', '0.3')
  //     .attr('dx', 350)
  //     .attr('dy', 13)
  //     .attr('transform', 'translate(0,0) rotate(90)');
  //
  //   params.svg
  //     .append('g')
  //     .classed('gridline', true)
  //     .attr('transform', 'translate(0,' + height + ')')
  //     .call(xGridlines().tickSize(-height).tickFormat(''));
  //
  //   params.svg
  //     .selectAll('.bar')
  //     .data(params.data)
  //     .enter()
  //     .append('rect')
  //     .classed('bar', true)
  //     .attr('x', 0)
  //     .attr('y', (d, i) => y(i))
  //     .attr('width', d => x(d.total))
  //     .attr('height', () => y(1) - 1);
  //
  //   params.svg
  //     .selectAll('.bar-label')
  //     .data(params.data)
  //     .enter()
  //     .append('text')
  //     .classed('bar-label', true)
  //     .attr('x', /*d => x(d.total/5000)*/ 0)
  //     .attr('dx', 5)
  //     .attr('y', (d, i) => y(i))
  //     .attr('dy', () => y(1) / 1.5 + 2)
  //     .style('pointer-events', 'none')
  //     .style('font-size', '24px')
  //     .text(d => d.name);
  // };
  //
  // return plot({ data, svg: chart });
//
//
//
// });
