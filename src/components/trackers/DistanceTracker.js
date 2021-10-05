import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'


const DistanceTracker = (props) => {

  return (
    <div className="list">
      <p>Distance: {props.distance}</p>;
      <button onClick={props.increaseDistance}><i className="fa-solid fa-circle-arrow-up" /></button>
      <button onClick={props.clearDistance}>Clear Distance</button>
    </div>
  );
};

export default DistanceTracker;
