import React, { Component } from "react";
import "./RegisterForm.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userName: "",
      password: "",
    };
  }

  handleUsername(e) {
    this.setState({
      userName: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div>
        <form className="RegisterForm" onSubmit={this.handleSubmit}>
          <div>
            <label className="text-center">Enter a Username: </label>
            <input
              type="text"
              minLength={6}
              placeholder="username"
              className="form-control"
              onChange={this.handleUsername}
              value={this.state.userName}
            ></input>
          </div>

          <div>
            <label className="text-center">Enter a Password: </label>
            <input
              type="text"
              minLength={8}
              placeholder="password"
              className=" form-control"
              onChange={this.handlePassword}
              value={this.state.password}
            ></input>
          </div>
          <br></br>
          <button type="submit" className="btn-sm btn-dark btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
