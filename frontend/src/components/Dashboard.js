import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Redirect, useHistory } from "react-router-dom";
import "./Dashboard.css";
import Axios from "axios";
export default function Dashboard() {
  const { UserData, setUserData } = useContext(UserContext);

  let history = useHistory();
  const changePage = () => {
    history.push("/update-profile");
  };
  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  const changeToQuote = () => {
    history.push("/form-creation");
  };

  const changeToHistory = () => {
    history.push("/fuel-history");
  };

  const viewProfile = async () => {
    const profileCheck = await Axios.get(
      "http://localhost:4000/getprofile/" + UserData.user.id,
      {
        headers: { "x-auth-token": localStorage.getItem("auth-token") },
      }
    );
  };
  return (
    <div>
      {UserData.user ? (
        <>
          <nav class="nav navbar justify-content-left">
            <h4>Fuel Quote App</h4>
            <button onClick={changePage} class="btn btn-sm btn-dark">
              Edit Profile
            </button>
            <button onClick={changeToHistory} class="btn btn-sm btn-dark">
              Quote History
            </button>
            <button onClick={changeToQuote} class="btn btn-sm btn-dark">
              Get Quote
            </button>
            <button class="btn btn-sm btn-dark" onClick={logOut}>
              Logout
            </button>
          </nav>
          <h1 className="text-center">Welcome {UserData.user.displayName}</h1>
        </>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Redirect to={{ pathname: "/" }} />
        </>
      )}
    </div>
  );
}
