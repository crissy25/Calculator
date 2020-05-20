import React from "react";
import "./History.css";

export const History = (props) => {
  return (
    <div>
      <h3>{"History (" + props.history.length + ")"}</h3>
      {props.history.map((hist, index) => (
        <div className={"history-data-styling"} key={index}>
          {hist}
        </div>
      ))}
    </div>
  );
};
