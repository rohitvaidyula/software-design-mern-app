import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import UserContext from "../context/UserContext";
import "./LoginForm.css";

export default function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const { handleSubmit, register, errors } = useForm();
  let history = useHistory();
  const { setUserData } = useContext(UserContext);

  const Submit = async (event) => {
    try {
      const request = {
        username: user,
        password: password,
      };

      const loginCheck = await axios.post(
        "http://localhost:4000/login",
        request
      );
      setUserData({
        JWToken: loginCheck.data.token,
        user: loginCheck.data.user,
      });

      localStorage.setItem("auth-token", loginCheck.data.token);
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form className="loginForm" onSubmit={handleSubmit(Submit)}>
        <div>
          <label>Username: </label>
          <input
            className="input"
            type="text"
            name="username"
            onChange={(e) => setUser(e.target.value)}
            ref={register({
              required: "Username required!",
              minLength: {
                message: "Username must be at least 5 characters!",
                value: 5,
              },
            })}
            value={user}
          ></input>
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Password: </label>
          <input
            className="input"
            name="password"
            type="password"
            ref={register({
              required: "Password required!",
              minLength: {
                message: "Password must be at least 8 characters!",
                value: 8,
              },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <br />
        <button type="submit" className="btn btn-outline-dark">
          Login
        </button>
      </form>
    </div>
  );
}
