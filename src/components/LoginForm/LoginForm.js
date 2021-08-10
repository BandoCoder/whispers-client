import React, { Component } from "react";
import AuthApiService from "../../services/auth-api-service";
import UserContext from "../../contexts/UserContext";
import { ScaleLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./LoginForm.css";

//Styles for loader
const override = css`
  display: flex;
  width: fit-content;
  justify-content: center;
  margin: auto;
`;

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => {},
  };

  static contextType = UserContext;

  state = { error: null, user_name: "", password: "", loading: false };

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

    this.setState({ error: null, loading: true });

    AuthApiService.postLogin({
      user_name,
      password,
    })
      .then((res) => {
        this.setState({
          user_name: "",
          password: "",
          loading: false,
        });
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error, loading: false });
      });
  };

  render() {
    const { error, loading } = this.state;
    return (
      <>
        <form className="loginForm" onSubmit={this.handleSubmit}>
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
            {loading ? (
              <ScaleLoader
                className="postList"
                loading={loading}
                css={override}
                size={70}
                color="grey"
              />
            ) : (
              <button className="loginBtn" type="submit">
                Login
              </button>
            )}
          </div>
        </form>
        <div className="alert" role="alert">
          <p>{error}</p>
        </div>
      </>
    );
  }
}

export default LoginForm;
