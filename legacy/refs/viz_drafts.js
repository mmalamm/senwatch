//step 1) get an array of all the senators with oil and gas as donors
let oilmen = senators.filter(sen => {
  if (!sen.crp.candIndustry) return false;
  return sen.crp.candIndustry.industry.filter(
    ind => ind['@attributes'].industry_name === 'Oil & Gas'
  ).length;
});

//step 2) sort the array by sen.crp.candIndustry.industry.filter( ind => ind['@attributes'].industry_name === 'Oil & Gas' )[0]['@attributes'].total
let filterer = sen => {
  return Number(
    sen.crp.candIndustry.industry.filter(
      ind => ind['@attributes'].industry_name === 'Oil & Gas'
    )[0]['@attributes'].total
  );
};

oilmen.sort((b, a) => filterer(a) - filterer(b));



let data = oilmen.map( oilman => {
  let name = `${oilman.first_name} ${oilman.last_name} (${oilman.party}-${oilman.state})`;
  let total = oilman.crp.candIndustry.industry.filter(
    ind => ind['@attributes'].industry_name === 'Oil & Gas'
  )[0]['@attributes'].total;
  return { name, total: Number(total), image: oilman.img_url };
});

let totals = data.map( ind => ind.total );
console.log(totals);
// name, total, pacs, indivs
let wits = data.map( ind => ind.total/5000 );

let w = 1000;
let h = 800;
let svg = d3.select('body').append('svg')
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
      .attr('width', d => x(d.total/5000) )
      .attr('height', () => y(1)-1 );

  params.svg.selectAll('.bar-label')
    .data(params.data)
    .enter()
      .append('text')
      .classed('bar-label', true)
      .attr("x", d => x(d.total/5000))
      // .attr('x', /*d => x(d.total/5000)*/0 )
      .attr('y', (d, i) => y(i) )
      .attr('dy', () => y(1)/1.5+2 )
      .attr('style', 'text-anchor:end')
      .text( d => d.name );

  params.svg.selectAll('.bar-img')
    .data(params.data)
    .enter()
      .append("image")
      // .attr("x", d => x(d.total/5000)-12)
      .attr('x', /*d => x(d.total/5000)*/0 )
      .attr("y", (d, i) => y(i)+ 2.5)
      .attr("height", "9px")
      .attr("width", "10px")
      .attr("xlink:href", d =>  d.image);
};


plot({data, svg});


//// age viz draft

const _calculateAge = birthday => {
  // birthday is a date
  let ageDifMs = Date.now() - birthday.getTime();
  let ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

senators.sort(
  (a, b) => _calculateAge(new Date(a.dob)) - _calculateAge(new Date(b.dob))
);
