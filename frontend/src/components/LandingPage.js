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
      <h2 className="text-center">Welcome to software Design Project</h2>
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
