import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";
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
            <Route component={NotFoundRoute} />
          </Switch>
        </main>
      </div>
    );
  }
}
