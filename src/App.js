import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/project/Navbar";
import AuthPreloader from "./components/project/auth/AuthPreloader";
import SignUp from "./components/project/auth/SignUp";
import SignInUser from "./components/project/auth/SignInUser";
import SignInTrainer from "./components/project/auth/SignInTrainer";
import Dashboard from "./components/project/Dashboard";
import TrainingList from "./components/project/training/TrainingList";
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
            <Route exact path="/signinuser" component={SignInUser} />
            <Route exact path="/signintrainer" component={SignInTrainer} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addtraining" component={TrainingList} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
