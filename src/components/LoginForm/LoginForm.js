import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import "./LoginForm.css";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null, user_name: "", password: "" };

  firstInput = React.createRef();

  // Handle State
  usernameChanged(user_name) {
    this.setState({ user_name });
  }
  passwordChanged(password) {
    this.setState({ password });
  }

  //Submit
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { user_name, password } = this.state;

    this.setState({ error: null });

    AuthApiService.postLogin({
      user_name,
      password,
    })
      .then((res) => {
        this.setState({
          user_name: "",
          password: "",
        });
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error.message });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="loginForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="loginUsername">
          <input
            className="logField"
            ref={this.firstInput}
            id="login-username-input"
            name="username"
            value={this.state.user_name}
            onChange={(e) => this.usernameChanged(e.target.value)}
            placeholder="Username"
            aria-label="username"
            required
            autoFocus
          />
        </div>
        <div className="loginPassword">
          <input
            className="logField"
            id="login-password-input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.passwordChanged(e.target.value)}
            placeholder="Password"
            aria-label="password"
            required
          />
        </div>
        <div className="centerLoginBtn">
          <button className="loginBtn" type="submit">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
