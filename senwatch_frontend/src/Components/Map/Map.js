import React, { Component } from "react";
import "./Map.css";

import { geoPath, json } from "d3";
import { feature } from "topojson-client";
import stateHash from "./statesInfo.js";
import Eyeball from "../Eyeball/Eyeball";
const { stateId2CodeMap } = stateHash;

class StateSVG extends Component {
  constructor(props) {
    super(props);
    const i = props.i;
    this.stateCode = stateId2CodeMap[i];
  }
  render() {
    const { i, d } = this.props;
    return <path d={d} uid={i} />;
  }
}

class Map extends Component {
  state = {
    us: { objects: { states: [] } },
    loaded: false
  };
  componentDidMount = async function() {
    const usJson = await json("https://d3js.org/us-10m.v1.json");
    this.setState({ us: usJson, loaded: true });
  };
  render() {
    const path = geoPath();
    const { loaded, us } = this.state;
    const { features } = feature(us, us.objects.states);
    return !loaded ? (
      <Eyeball />
    ) : (
      <svg className="map-svg" viewBox="0 0 960 600">
        <g className="states">
          {features.map(path).map((p, i) => <StateSVG key={i} i={i} d={p} />)}
        </g>
      </svg>
    );
  }
}

export default Map;
