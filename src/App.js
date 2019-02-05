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
import EditTraining from "./components/project/training/EditTraining";
import TrainingHistory from "./components/project/profile/TrainingHistory";
import TrainerDescription from "./components/project/profile/TrainerDescription";
import TrainerClasses from "./components/project/profile/TrainerClasses";

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
            <Route
              exact
              path="/editTraining/:trainingId"
              component={EditTraining}
            />
            <Route
              exact
              path="/traininghistory/:profileId"
              component={TrainingHistory}
            />
            <Route
              exact
              path="/trainerdescription/:profileId"
              component={TrainerDescription}
            />
            <Route
              exact
              path="/trainerclasses/:profileId"
              component={TrainerClasses}
            />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
