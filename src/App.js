import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/project/Navbar";
import AuthPreloader from "./components/project/auth/AuthPreloader";
import SignUp from "./components/project/auth/SignUp";
import About from "./components/project/About";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={AuthPreloader} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/about" component={About} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
