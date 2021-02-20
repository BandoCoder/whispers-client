import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import "./SignupForm.css";

class SignupForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = {
    error: null,
    user_name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    passwordAttempted: false,
  };

  // Handle State
  usernameChanged(user_name) {
    this.setState({ user_name });
  }
  emailChanged(email) {
    this.setState({ email });
  }
  passwordChanged(password) {
    this.setState({ password });
  }
  passwordRepeatChanged(passwordRepeat) {
    this.setState({ passwordRepeat });
  }

  // Validate password match
  passwordConfirm = () => {
    if (!this.state.passwordAttempted)
      this.setState({
        passwordAttempted: true,
      });
    if (this.state.password !== this.state.passwordRepeat) {
      this.setState({ error: "password must match" });
    } else {
      this.setState({ error: null });
    }
  };

  //Submit new user
  handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, email, password, passwordRepeat } = this.state;

    this.setState({ error: null });
    try {
      if (password !== passwordRepeat) {
        // eslint-disable-next-line no-throw-literal
        throw "password must match";
      }

      this.setState({ error: null });
      AuthApiService.postUser({
        user_name,
        email,
        password,
      })
        .then((user) => {
          this.setState({
            user_name: "",
            email: "",
            password: "",
            passwordRepeat: "",
          });
          this.props.onRegistrationSuccess();
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    } catch (err) {
      this.setState({ error: err });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form className="signupForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="enterUsername">
          <input
            className="regField"
            id="registration-username-input"
            name="username"
            value={this.state.user_name}
            onChange={(e) => this.usernameChanged(e.target.value)}
            placeholder="Enter username"
            aria-label="username"
            required
            autoFocus
          />
        </div>
        <div className="enterEmail">
          <input
            className="regField"
            id="registration-email-input"
            name="email"
            value={this.state.email}
            onChange={(e) => this.emailChanged(e.target.value)}
            placeholder="Enter Email"
            aria-label="email"
            required
          />
        </div>
        <div className="enterPass">
          <input
            className="regField"
            id="registration-password-input"
            name="password"
            type="password"
            value={this.state.password}
            onChange={(e) => this.passwordChanged(e.target.value)}
            placeholder="Enter password"
            aria-label="password"
            required
          />
        </div>
        <div className="confirmPass">
          <input
            className="regField"
            id="registration-password-confirm"
            name="passwordConfirm"
            type="password"
            value={this.state.passwordRepeat}
            onChange={(e) => this.passwordRepeatChanged(e.target.value)}
            onBlur={() => this.passwordConfirm()}
            placeholder="Confirm password"
            aria-label="Confirm password"
            required
          />
        </div>
        <button className="submit" type="submit">
          Submit
        </button>
        <footer className="footer">
          <Link className="loginLink" to="/login">
            Already have an account?
          </Link>
        </footer>
      </form>
    );
  }
}

export default SignupForm;
