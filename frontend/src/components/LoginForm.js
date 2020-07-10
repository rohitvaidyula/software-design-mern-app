import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./LoginForm.css";
export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    this.state = {
      username: "",
      password: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  HandleSubmit = (e) => {
    e.preventDefault();
    let request = {
      username: this.state.username,
      password: this.state.password,
    };

    axios.post("http://localhost:4000/login", request).then((resp) => {
      alert(resp.data.message);
    });
  };

  render() {
    return (
      <form className="LoginForm" onSubmit={this.HandleSubmit}>
        <div>
          <label className="text-center">Username</label>
          <input
            className="form-control"
            type="text"
            placeholder="username"
            required
            onChange={this.onChangeUsername}
            value={this.state.username}
          ></input>
        </div>

        <div>
          <label className="text-center">Password</label>
          <input
            className="form-control"
            type="password"
            placeholder="••••••••"
            required
            onChange={this.onChangePassword}
            value={this.state.password}
          ></input>
        </div>
        <br></br>
        <button type="submit" className="btn-sm btn-dark btn-block">
          Submit
        </button>
      </form>
    );
  }
}
