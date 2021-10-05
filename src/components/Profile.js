import React, { useState, useEffect } from "react";
import Axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import { Link } from "react-router-dom";

import DarkMode from "./DarkMode";

const { REACT_APP_SERVER_URL } = process.env;

const Profile = (props) => {
  const [progress, setProgress] = useState("");
  const { handleLogout, user } = props;
  const { id, name, email, exp } = user;
  const expirationTime = new Date(exp * 1000);
  let currentTime = Date.now();

  let token = localStorage.getItem("jwtToken");
  console.log(token);

  setAuthToken(token);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await Axios.get(`${REACT_APP_SERVER_URL}/progress`);
      //    console.log("fetch progress", response.progress);
      // const { results } = response.data.routines;
      setProgress(response.data.progress);
    };
    fetchExercises();
  }, []);

  console.log("progress state", progress);

  // make a condition that compares exp and current time
  if (currentTime >= expirationTime) {
    handleLogout();
    alert("Session has ended. Please login to continue.");
  }

  const userData = user ? (
    <div>
      <h1>Profile</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>ID: {id}</p>
    </div>
  ) : (
    <h2>Loading...</h2>
  );

  const errorDiv = () => {
    return (
      <div className="text-center pt-4">
        <h3>
          Please <Link to="/login">login</Link> to view this page
        </h3>
      </div>
    );
  };

  return (
    <div className="text-center pt-4">
      {user ? userData : errorDiv()}
      <DarkMode />
    </div>
  );
};

export default Profile;
