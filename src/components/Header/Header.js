import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../../services/token-service";
import UserContext from "../../contexts/UserContext";
import "./Header.css";

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  //Logged in header
  renderLoggedIn() {
    return (
      <div>
        <nav>
          <Link
            className="navLink"
            onClick={this.handleLogoutClick}
            to="/login"
          >
            Logout
          </Link>{" "}
          <Link className="navLink" to={"/posts/" + this.context.user.id}>
            Your Whispers
          </Link>{" "}
          <Link className="navLink" to={"/likes/" + this.context.user.id}>
            Likes
          </Link>
        </nav>
      </div>
    );
  }

  //Logged out header
  renderLoggedOut() {
    return (
      <nav>
        <Link className="navLink" to="/login">
          Login
        </Link>{" "}
        <Link className="navLink" to="/signup">
          Sign up
        </Link>
      </nav>
    );
  }

  render() {
    return (
      <header>
        <div className="boxDiv headDiv">
          <h1>
            <Link className="headLink" to="/posts">
              Whispers
            </Link>
          </h1>
          <div className="navBar">
            {TokenService.hasAuthToken() //Check for auth token
              ? this.renderLoggedIn()
              : this.renderLoggedOut()}
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
