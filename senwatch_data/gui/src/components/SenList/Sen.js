import React from "react";
import { getPartyClass, getImage } from "./lib";

class Sen extends React.Component {
  state = {
    sen: this.props.sen
  };
  handleClick = e => {
    getImage(this.props.sen).then(d => {
      console.log(d);
      this.setState(prevState => {
        return {
          sen: {
            ...prevState.sen,
            image_url: d
          }
        };
      });
    });
  };
  render() {
    const { sen } = this.props;
    const img = this.state.sen.image_url;
    console.log(img);
    return (
      <div className={`Sen ${getPartyClass(sen.party)}`}>
        {img && <img src={img} alt="" />}
        {sen.first_name} {sen.last_name} ({sen.party})
        <button onClick={this.handleClick}>Get Image</button>
      </div>
    );
  }
}

export default Sen;
