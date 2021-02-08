import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import "./LoginForm.css";

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then((res) => {
        username.value = "";
        password.value = "";
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="loginUsername">
          <input
            className="logField"
            ref={this.firstInput}
            id="login-username-input"
            name="username"
            placeholder="Username"
            aria-label="username"
            required
          />
        </div>
        <div className="loginPassword">
          <input
            className="logField"
            id="login-password-input"
            name="password"
            type="password"
            placeholder="Password"
            aria-label="password"
            required
          />
        </div>
      </form>
    );
  }
}

export default LoginForm;
