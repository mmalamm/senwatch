import React from "react";
import "./SenList.css";

import Sen from "./Sen";

const SenList = props => {
  return (
    <div className="SenList">
      {props.sens.map(sen => {
        return <Sen key={sen.id} sen={sen} />;
      })}
    </div>
  );
};

export default SenList;
