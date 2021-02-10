import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicOnlyRoute from "../PublicOnlyRoute/PublicOnlyRoute";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
import LoginRoute from "../../routes/LoginRoute/LoginRoute";
import SignupRoute from "../../routes/SignupRoute/SignupRoute";
import Posts from "../Posts/Posts";
import UserPosts from "../../components/UserPosts/UserPosts";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import "./App.css";

export default class App extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          {hasError && <p>Something went wrong</p>}
          <Switch>
            <Route exact path={"/"} component={Landing} />
            <Route exact path={"/posts"} component={Posts} />
            <PublicOnlyRoute exact path={"/login"} component={LoginRoute} />
            <PublicOnlyRoute exact path={"/signup"} component={SignupRoute} />
            <PrivateRoute exact path={"/posts/:userId"} component={UserPosts} />
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
