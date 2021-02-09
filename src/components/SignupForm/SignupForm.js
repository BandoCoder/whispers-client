import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthApiService from "../../services/auth-api-service";
import "./SignupForm.css";

class SignupForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then((user) => {
        name.value = "";
        username.value = "";
        password.value = "";
        this.props.onRegistrationSuccess();
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
      <form className="signupForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <div className="enterName">
          <input
            className="regField"
            ref={this.firstInput}
            id="registration-name-input"
            name="name"
            placeholder="Enter Name"
            aria-label="name"
            required
          />
        </div>
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
