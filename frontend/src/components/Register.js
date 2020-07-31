import React, { useState, useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserContext from "../context/UserContext";
import "./RegisterForm.css";

export default function Register() {
  const [user, setuserData] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const { setUserData } = useContext(UserContext);
  let history = useHistory();
  const { handleSubmit, errors, register, watch } = useForm({});
  const pass = useRef({});
  pass.current = watch("password", "");

  const Submit = async (event) => {
    let request = {
      username: user,
      password: password,
    };
    await axios.post("http://localhost:4000/register", request);
    const loginCheck = await axios.post("http://localhost:4000/login", request);

    setUserData({
      JWToken: loginCheck.data.token,
      user: loginCheck.data.user,
    });

    localStorage.setItem("auth-token", loginCheck.data.token);
    history.push("/add-profile");
  };

  return (
    <div>
      <form className="registerForm" onSubmit={handleSubmit(Submit)}>
        <div>
          <label>Enter a username:</label>
          <input
            className="input-form"
            type="text"
            name="username"
            ref={register({
              required: "Enter a username!",
              minLength: {
                message: "Username must be at least 5 characters",
                value: 5,
              },
            })}
            onChange={(e) => {
              setuserData(e.target.value);
            }}
          ></input>
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Enter a password:</label>
          <input
            className="input-form"
            type="password"
            name="password"
            ref={register({
              required: "You must specify a password",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters",
              },
            })}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <label>Verify your password:</label>
          <input
            className="input-form"
            type="password"
            name="repeat_password"
            ref={register({
              required: "Verify your Password!",
              validate: {
                matchPassword: (value) => {
                  return value === pass.current || "Passwords do not match";
                },
              },
            })}
            onChange={(e) => setPasswordCheck(e.target.value)}
          ></input>
          {errors.repeat_password && <p>{errors.repeat_password.message}</p>}
        </div>
        <br />
        <button type="submit" className="btn btn-outline-dark">
          Register
        </button>
      </form>
    </div>
  );
}
