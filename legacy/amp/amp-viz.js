const sec = require('../secrets');
const MongoClient = require('mongodb').MongoClient;
const mongodb = sec.secrets.mongodb;
const path = require('path');


var jsdom = require('jsdom/lib/old-api.js');
const fs = require('fs');
const d3 = require('d3');
const bannerColor = party => {
  switch (party) {
    case 'R':
      return '#B24C63';
    case 'D':
      return '#2B5CCE';
    default:
      return '#267543';
  }
};

const produceSVG = (sen, res) => {
  jsdom.env(
    "<html><body></body></html>",
    [ 'https://d3js.org/d3.v4.min.js' ],
    function (err, window) {
      //////////

      let attr = sen.crp.candIndustry['@attributes'];
      let candName = attr.cand_name;
      let party = candName[candName.length - 2];

      let data = sen.crp.candIndustry.industry.map(ind => {
        let name = ind['@attributes'].industry_name;
        let total = Number(ind['@attributes'].total);
        let pacs = Number(ind['@attributes'].pacs);
        let indivs = Number(ind['@attributes'].indivs);
        return { name, total, pacs, indivs };
      });

      let w = 460;
      let h = 400;

      let margin = {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20
      };

      let width = w - margin.left - margin.right;
      let height = h - margin.top - margin.bottom;

      let colour = d3.color(bannerColor(party)).darker();

      let svg = window.d3
        .select('body')
        .append('svg')
        .attr('id', 'chart')
        .attr('height', h)
        .attr('width', w)
        .attr('style', `background:${colour}`);

      let chart = svg
        .append('g')
        .classed('display', true)
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // this creates the axis scales
      let x = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.total + 50000)])
        .range([0, width]);
      let y = d3.scaleLinear().domain([0, data.length]).range([0, height]);

      let xAxis = d3.axisBottom(x).ticks(10);
      let xGridlines = () => {
        return d3.axisBottom(x).ticks(10);
      };
      // this makes the bars and labels
      const plot = params => {
        params.svg
          .append('g')
          .attr('class', 'axis')
          .call(xAxis)
          .selectAll('text')
          .style('text-anchor', 'end')
          .style('pointer-events', 'none')
          .style('font-size', '24px')
          .style('fill', 'white')
          .style('opacity', '0.3')
          .attr('dx', 350)
          .attr('dy', 13)
          .attr('transform', 'translate(0,0) rotate(90)');

        params.svg
          .append('g')
          .classed('gridline', true)
          .attr('transform', 'translate(0,' + height + ')')
          .call(xGridlines().tickSize(-height).tickFormat(''));

        params.svg
          .selectAll('.bar')
          .data(params.data)
          .enter()
          .append('rect')
          .classed('bar', true)
          .attr('x', 0)
          .attr('y', (d, i) => y(i))
          .attr('width', d => x(d.total))
          .attr('height', () => y(1) - 1)
          .style('fill', '#0080FF');

        params.svg
          .selectAll('.bar-label')
          .data(params.data)
          .enter()
          .append('text')
          .classed('bar-label', true)
          .attr('x', /*d => x(d.total/5000)*/ 0)
          .attr('dx', 5)
          .attr('y', (d, i) => y(i))
          .attr('dy', () => y(1) / 1.5 + 2)
          .style('pointer-events', 'none')
          .style('font-size', '24px')
          .style('fill', 'white')
          .text(d => d.name);
      };

      plot({ data, svg: chart });




      //////////////////
      let out = window.d3.select("body").html();
      out = out.replace('svg id="chart"', `svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' id="chart"`);
      out = out.replace('<script class="jsdom" src="https://d3js.org/d3.v4.min.js"></script>', '');
      out = out.replace('<text fill="#000" y="9" dy="13" style="text-anchor: end; pointer-events: none; font-size: 24px; fill: white; opacity: 0.3;" dx="350" transform="translate(0,0) rotate(90)">0</text>', '');
      out = out.replace(/#000/g, '#fff');
      console.log(out);
      fs.writeFileSync(`amp/amp_viz_files/${sen.pp_id}-viz.svg`, out);
      res.sendFile(path.join(__dirname + `/amp_viz_files/${sen.pp_id}-viz.svg`));
    }
  );
};



///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
const ampViz = (app) => {
  app.get('/amp-data/crp/:pp_id', (req, res) => {

    let senId = req.params.pp_id;

    const ampStuff = (res) => {
      MongoClient.connect(mongodb, (err, db) => {
        if (err) {
          return console.log('Unable to connect to mongodb server');
        }
        db.collection('Sens').find({
          pp_id: senId
        }).toArray().then( data => produceSVG(data[0], res) );
      });

    };

    ampStuff(res);
  });
};

exports.ampViz = ampViz;
