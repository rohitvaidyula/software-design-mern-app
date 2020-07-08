import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Modali, { useModali } from "modali";
function App() {
  const [RegisterModal, toggleRegistelModal] = useModali({
    animated: true,
  });
  return (
    <div className="App">
      <h1 className="text-center">Software Design Project</h1>
      <h4 className="text-center">Please login or signup</h4>
      <LoginForm />
      <p>Are you new here? Click here to sign-up</p>
      <button
        onClick={toggleRegistelModal}
        className="button btn-sm btn-dark btn-block"
      >
        Signup
      </button>
      <Modali.Modal {...RegisterModal}>
        <RegisterForm />
      </Modali.Modal>
    </div>
  );
}

export default App;
