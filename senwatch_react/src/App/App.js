import React, { Component } from "react";
import "./App.css";

import * as d3 from "d3";
import * as topojson from "topojson-client";

class App extends Component {
  componentDidMount = async function() {
    const svg = d3.select("svg");
    const path = d3.geoPath();
    const us = await d3.json("https://d3js.org/us-10m.v1.json");
    svg
      .append("g")
      .attr("class", "states")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.states).features)
      .enter()
      .append("path")
      .attr("d", path);

    svg
      .append("path")
      .attr("class", "state-borders")
      .attr(
        "d",
        path(
          topojson.mesh(us, us.objects.states, function(a, b) {
            return a !== b;
          })
        )
      );
  };
  render() {
    return (
      <div className="App">
        <svg className="map-svg" width="960" height="600" />
        <div>Hello Senwatch</div>
      </div>
    );
  }
}

export default App;
