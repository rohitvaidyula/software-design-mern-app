import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import UserContext from "./context/UserContext";
import Axios from "axios";

function App() {
  const [UserData, setUserData] = useState({
    JWToken: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenCheck = await Axios.post(
        "http://localhost:4000/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenCheck.data) {
        const userCheck = await Axios.get("http://localhost:4000/getUserData", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userCheck.data,
        });
      }
    };

    checkLoggedIn();
  }, []);
  return (
    <>
      <Router>
        <UserContext.Provider value={{ UserData, setUserData }}>
          <Switch>
            <Route exact path="/" component={LandingPage}></Route>
            <Route exact path="/dashboard" component={Dashboard}></Route>
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
}

export default App;
