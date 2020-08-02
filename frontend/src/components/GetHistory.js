import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import { Redirect, useHistory } from "react-router-dom";

export default function GetHistory() {
  const { UserData } = useContext(UserContext);
  let history = useHistory();

  useEffect(() => {
    const getFuelHistory = async () => {
      const token = localStorage.getItem("auth-token");
      const ID = UserData.user.id;
    };
    getFuelHistory();
  }, []);
  return <div></div>;
}
