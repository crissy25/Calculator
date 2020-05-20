import React from "react";
import "./Button.css";

export const Button = (props) => {
  return (
    <div>
      <button onClick={() => props.onClick()}>{props.value}</button>
    </div>
  );
};
