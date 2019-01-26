import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/project/Navbar";
import AuthPreloader from "./components/project/auth/AuthPreloader";
import SignUp from "./components/project/auth/SignUp";
import SignIn from "./components/project/auth/SignIn";
import Dashboard from "./components/project/Dashboard";
import TrainingList from "./components/project/training/TrainingList";
import About from "./components/project/About";
import EditProfile from "./components/project/profile/EditProfile";

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
            <Route exact path="/signinuser" component={SignIn} />
            <Route exact path="/signintrainer" component={SignIn} />
            <Route exact path="/dashboard/:id" component={Dashboard} />
            <Route
              exact
              path="/addtraining/:trainerid/:userid"
              component={TrainingList}
            />
            <Route exact path="/editprofile/:id" component={EditProfile} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
