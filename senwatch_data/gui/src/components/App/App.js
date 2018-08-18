import React, { Component } from "react";
import "./App.css";

import SenList from "../SenList/SenList";

import axios from "axios";

class App extends Component {
  state = {
    sens: []
  };
  componentDidMount() {
    axios.get("http://localhost:5050/api").then(data => {
      console.log(data.data);
      window.sens = data.data.members;
      this.setState({ sens: data.data.members });
    });
  }
  render() {
    return <div className="App">{<SenList sens={this.state.sens} />}</div>;
  }
}

export default App;
