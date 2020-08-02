import React from "react";
import "./LandingPage.css";
import Login from "./Login";
import Register from "./Register";
import Modali, { useModali } from "modali";
export default function LandingPage() {
  const [loginModal, toggleLoginModal] = useModali({
    animated: true,
  });

  const [registerModal, toggleRegisterModal] = useModali({
    animated: true,
  });

  return (
    <div className="landingPage">
      <h1 className="text-center">Welcome to Software Design Project</h1>

      <div className="loginOptions">
        <button class="btn-sm btn-dark btn-block" onClick={toggleLoginModal}>
          Login
        </button>

        <button class="btn-sm btn-dark btn-block" onClick={toggleRegisterModal}>
          Register
        </button>

        <Modali.Modal {...loginModal}>
          <Login />
        </Modali.Modal>

        <Modali.Modal {...registerModal}>
          <Register />
        </Modali.Modal>
      </div>
    </div>
  );
}
