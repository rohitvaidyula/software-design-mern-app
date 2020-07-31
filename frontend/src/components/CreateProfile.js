import React, { useState, useContext } from "react";
import { handleSubmit, errors, register, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
export default function CreateProfile() {
  const { UserData, setUserData } = useContext(UserContext);

  const { handleSubmit } = useForm({});
  let history = useHistory();
  const Submit = () => {
    history.push("/dashboard");
  };
  return (
    <div>
      {UserData.user ? (
        <form onSubmit={handleSubmit(Submit)}>
          <h1>Sup {UserData.user.displayName} Register your ass</h1>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <h1>I guess it didn't work for some reason</h1>
      )}
    </div>
  );
}
