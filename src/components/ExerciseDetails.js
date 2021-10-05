import React, { useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

import RepsTracker from "./trackers/RepsTracker";
import SetsTracker from "./trackers/SetsTracker";
import WeightTracker from "./trackers/WeightTracker";
import DistanceTracker from "./trackers/DistanceTracker";
import DurationTracker from "./trackers/DurationTracker";

import '../App.css';

const { REACT_APP_SERVER_URL } = process.env;

const ExerciseDetails = (props) => {
  console.log('exercise details props', props)
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [steps, setSteps] = useState(props.steps);
  const [goals, setGoals] = useState([]);

  let token = localStorage.getItem("jwtToken");

  setAuthToken(token);

  const increaseSets = () => {
    const newSetsNumber = sets >= 30 ? 10 : sets + 1;
    setSets(newSetsNumber);
  };
  const clearSets = () => {
    setSets(0);
  };

  const increaseReps = () => {
    const newRepsNumber = reps >= 30 ? 10 : reps + 1;
    setReps(newRepsNumber);
  };
  const clearReps = () => {
    setReps(0);
  };

  const increaseWeight = () => {
    const newWeightNumber = weight >= 800 ? 10 : weight + 5;
    setWeight(newWeightNumber);
  };
  const clearWeight = () => {
    setWeight(0);
  };

  const increaseDistance = () => {
    const newDistanceNumber = distance >= 10 ? 10 : distance + 1;
    setDistance(newDistanceNumber);
  };
  const clearDistance = () => {
    setDistance(0);
  };

  const increaseDuration = () => {
    const newDurationNumber = duration >= 1000 ? 10 : duration + 1;
    setDuration(newDurationNumber);
  };
  const clearDuration = () => {
    setDuration(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log("we hit the handlesubmit for the form");

      const newProgress = { duration, weight, reps, sets, distance, exerciseId: props._id };
      axios
        .post(`${REACT_APP_SERVER_URL}/progress`, newProgress)
        .then((response) => {
          console.log("===> Yay, new exercise");
          console.log('exercise response', response);
          // setRedirect(true);
        })
        .catch((error) => console.log("===> Error in Signup", error));
    
  };

  useEffect(() => {
    const fetchGoals = async () => {
      const response = await axios.get(`${REACT_APP_SERVER_URL}/goals`);
        //  console.log("fetch goals", response.data.goals);
      // const { results } = response.data.routines;
      setGoals(response.data.goals);
    };
    fetchGoals();
  }, []);

console.log('goals', goals)
  return (
    <div className="card">
      <div className="face face1">
        <div className="content">
          <span className="stars"></span>
          <h2 className="java">{props.muscleGroup}</h2>
          <img className="exerciseImg" src={props.img_url} alt="" />
          <p className="java">Steps: {props.steps}</p>
          {props.type === "Resistance" ? ( 
            <>
          <p className="java">Weight Goal: {props.weightGoal}</p>
          <p className="java">Reps Goal: {props.repsGoal}</p>
          <p className="java">Sets Goal: {props.setsGoal}</p>
          </>
          ) : ( 
            <>
          <p className="java">Distance Goal: {props.distanceGoal}</p>
          </>
            )}
        <div className="trackerContainer" >
        {props.type === "Resistance" ? (<>  
        <RepsTracker
          reps={reps}
          increaseReps={increaseReps}
          clearReps={clearReps}
        />
        <SetsTracker
          sets={sets}
          increaseSets={increaseSets}
          clearSets={clearSets}
        />
        <WeightTracker
          weight={weight}
          increaseWeight={increaseWeight}
          clearWeight={clearWeight}
        />
        </>) : (<>  
        <DistanceTracker
          distance={distance}
          increaseDistance={increaseDistance}
          clearDistance={clearDistance}
        />
        <DurationTracker
          duration={duration}
          increaseDuration={increaseDuration}
          clearDuration={clearDuration}
        />
         </>)}
        <button onClick={handleSubmit} >Save Progress</button>
        </div>
        </div>
      </div>
      <div className="face face2">
        <h2>{props.name}</h2>
      </div>
    </div>
  );
};

export default ExerciseDetails;

