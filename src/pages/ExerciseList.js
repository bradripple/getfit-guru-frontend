import React, { useState } from "react";
import RoutineDropDown from "../components/RoutineDropDown";
import axios from "axios";

import RepsTracker from "../components/trackers/RepsTracker";
import SetsTracker from "../components/trackers/SetsTracker";
import WeightTracker from "../components/trackers/WeightTracker";
import DistanceTracker from "../components/trackers/DistanceTracker";
import DurationTracker from "../components/trackers/DurationTracker";

const { REACT_APP_SERVER_URL } = process.env;

function ExerciseList(props) {
  console.log("props of exercises", props);
  const [durationGoal, setDurationGoal] = useState(0);
  const [distanceGoal, setDistanceGoal] = useState(0);
  const [weightGoal, setWeightGoal] = useState(0);
  const [repsGoal, setRepsGoal] = useState(0);
  const [setsGoal, setSetsGoal] = useState(0);

  const increaseSets = () => {
    const newSetsNumber = setsGoal >= 30 ? 10 : setsGoal + 1;
    setSetsGoal(newSetsNumber);
  };
  const clearSets = () => {
    setSetsGoal(0);
  };

  const increaseReps = () => {
    const newRepsNumber = repsGoal >= 30 ? 10 : repsGoal + 1;
    setRepsGoal(newRepsNumber);
  };
  const clearReps = () => {
    setRepsGoal(0);
  };

  const increaseWeight = () => {
    const newWeightNumber = weightGoal >= 800 ? 10 : weightGoal + 5;
    setWeightGoal(newWeightNumber);
  };
  const clearWeight = () => {
    setWeightGoal(0);
  };

  const increaseDistance = () => {
    const newDistanceNumber = distanceGoal >= 10 ? 10 : distanceGoal + 1;
    setDistanceGoal(newDistanceNumber);
  };
  const clearDistance = () => {
    setDistanceGoal(0);
  };

  const increaseDuration = () => {
    const newDurationNumber = durationGoal >= 1000 ? 10 : durationGoal + 1;
    setDurationGoal(newDurationNumber);
  };
  const clearDuration = () => {
    setDurationGoal(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("we hit the handlesubmit for the form");

    const newGoals = {
      durationGoal,
      weightGoal,
      repsGoal,
      setsGoal,
      distanceGoal,
      exerciseId: props._id,
    };
    axios
      .post(`${REACT_APP_SERVER_URL}/goals`, newGoals)
      .then((response) => {
        console.log("===> Yay, new goal");
        console.log("goal response", response);
        // setRedirect(true);
      })
      .catch((error) => console.log("===> Error in Signup", error));
  };

  return (
    <div className="card">
      <div className="face face1">
        <div className="content">
          <span className="stars"></span>
          <RoutineDropDown exerciseId={props._id} />
          <h2 className="java">{props.name}</h2>
          <div className="trackerContainer">
            {props.type === "Resistance" ? (
              <>
                <RepsTracker
                  reps={repsGoal}
                  increaseReps={increaseReps}
                  clearReps={clearReps}
                />
                <SetsTracker
                  sets={setsGoal}
                  increaseSets={increaseSets}
                  clearSets={clearSets}
                />
                <WeightTracker
                  weight={weightGoal}
                  increaseWeight={increaseWeight}
                  clearWeight={clearWeight}
                />
              </>
            ) : (
              <>
                <DistanceTracker
                  distance={distanceGoal}
                  increaseDistance={increaseDistance}
                  clearDistance={clearDistance}
                />
                <DurationTracker
                  duration={durationGoal}
                  increaseDuration={increaseDuration}
                  clearDuration={clearDuration}
                />
              </>
            )}
            <button onClick={handleSubmit}>Save Progress</button>
          </div>

          {/* {props.type === "Resistance" ? (<> 
              <p className="java">Weight: {props.weightGoal}</p>
              <p className="java">Reps: {props.repsGoal}</p>
              <p className="java">Sets: {props.setsGoal}</p>
              </>) : (<>   
              <p className="java">Duration: {props.durationGoal}</p>
              <p className="java">Distance: {props.distanceGoal}</p>
              </>)} */}
        </div>
      </div>
      <div className="face face2">
        <h2>{props.muscleGroup}</h2>
      </div>
    </div>
  );
}

export default ExerciseList;
