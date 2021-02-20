import React, { Component } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupRoute.css";
class SignupRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  };

  //Push to the login page after signup
  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push("/login");
  };

  render() {
    return (
      <div className="centerDiv">
        <section className="regSection">
          <h2>Sign up</h2>
          <SignupForm onRegistrationSuccess={this.handleRegistrationSuccess} />
        </section>
      </div>
    );
  }
}

export default SignupRoute;
