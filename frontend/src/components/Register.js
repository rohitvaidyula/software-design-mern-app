import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./RegisterForm.css";
export default function Register() {
  const [user, setUserData] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  let history = useHistory();
  const { handleSubmit, errors, register, watch } = useForm({});
  const pass = useRef({});
  pass.current = watch("password", "");
  const Submit = (event) => {
    let request = {
      username: user,
      password: password,
      passCheck: passwordCheck,
    };
    axios
      .post("http://localhost:4000/register", request)
      .then((resp) => {
        if (resp.data) {
          alert("Success! You are now logged in.");
          history.push("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
              setUserData(e.target.value);
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
