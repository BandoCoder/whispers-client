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

  renderLoggedIn() {
    return (
      <div>
        <nav>
          <span className="userSpan">{this.context.user.name}</span>
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
        <h1>
          <Link className="headLink" to="/">
            Whispers
          </Link>
        </h1>
        <div className="navBar">
          {TokenService.hasAuthToken()
            ? this.renderLoggedIn()
            : this.renderLoggedOut()}
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
