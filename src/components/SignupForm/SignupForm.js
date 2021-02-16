import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import "./SignupForm.css";

class SignupForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, email, password } = ev.target;
    AuthApiService.postUser({
      user_name: username.value,
      email: email.value,
      password: password.value,
    })
      .then((user) => {
        username.value = "";
        password.value = "";
        email.value = "";
        this.props.onRegistrationSuccess();
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
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
            placeholder="Enter username"
            aria-label="username"
            required
          />
        </div>
        <div className="enterEmail">
          <input
            className="regField"
            id="registration-email-input"
            name="email"
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
            placeholder="Enter password"
            aria-label="password"
            required
          />
        </div>
        <footer className="footer">
          <Link className="loginLink" to="/login">
            Already have an account?
          </Link>
        </footer>
        <button className="submit" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default SignupForm;
