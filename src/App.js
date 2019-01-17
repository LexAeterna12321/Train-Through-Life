import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthPreloader from "./components/project/auth/AuthPreloader";
import SignUp from "./components/project/auth/SignUp";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AuthPreloader} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </Router>
    );
  }
}

export default App;
