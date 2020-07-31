import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Redirect } from "react-router-dom";

export default function Dashboard() {
  const { UserData, setUserData } = useContext(UserContext);

  const logOut = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });

    localStorage.setItem("auth-token", "");
  };
  return (
    <div>
      {UserData.user ? (
        <>
          <h1>Welcome {UserData.user.displayName}</h1>
          <button onClick={logOut}>Logout</button>
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
