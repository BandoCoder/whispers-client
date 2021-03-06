import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginRoute.css";

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  //On login push to main whisper page
  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/posts";
    history.push(destination);
  };

  render() {
    return (
      <div className="centerDiv2">
        <section className="login">
          <h2>Login</h2>
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        </section>
      </div>
    );
  }
}

export default LoginRoute;
