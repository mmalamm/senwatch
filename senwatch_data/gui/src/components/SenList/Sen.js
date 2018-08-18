import React from "react";
import { getPartyClass } from "./lib";

const Sen = ({ sen }) => {
  return (
    <div className={`Sen ${getPartyClass(sen.party)}`}>
      {sen.first_name} {sen.last_name} ({sen.party})
    </div>
  );
};

export default Sen;
