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
import UserLikes from "../../components/UserLikes/UserLikes";
import NotFoundRoute from "../../routes/NotFoundRoute/NotFoundRoute";
import "./App.css";

export default class App extends Component {
  state = { hasError: false };

  //General error handling
  static getDerivedStateFromError(error) {
    console.error(error);
    return this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    return (
      <div className="App">
        <div className="stickyHeader">
          <Header />
        </div>
        <main className="backDiv">
          <div className="darken">
            {hasError && <p>Something went wrong</p>}
            <Switch>
              <Route exact path={"/"} component={Landing} />
              <Route exact path={"/posts"} component={Posts} />
              <PublicOnlyRoute exact path={"/login"} component={LoginRoute} />
              <PublicOnlyRoute exact path={"/signup"} component={SignupRoute} />
              <PrivateRoute
                exact
                path={"/posts/:userId"}
                component={UserPosts}
              />
              <PrivateRoute
                exact
                path={"/likes/:userId"}
                component={UserLikes}
              />
              <Route component={NotFoundRoute} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}
