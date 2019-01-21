import React, { Component } from "react";
import { connect } from "react-redux";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    // avoids invalid users  sprawdzić!!!

    const userEmail = this.state.email;
    const userPassword = this.state.password;

    // combined arrays of users and trainers
    const profiles = [...this.props.users, ...this.props.trainers];

    const userMatched = profiles
      ? profiles.find(profile => {
          return (
            userEmail === profile.email && userPassword === profile.password
          );
        })
      : null;

    if (!userMatched) return;
    // matching if user is logging through user signIn and if trainer is logging through trainer signIn
    if (
      (userMatched.trainer && this.props.match.path === "/signintrainer") ||
      (userMatched.user && this.props.match.path === "/signinuser")
    ) {
      const id = userMatched.id;
      this.props.history.push(`/dashboard/${id}`);
    } else {
      return console.log(
        "Brak usera w bazie, lub user loguje się jako trener lub odwrotnie"
      );
    }
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password } = this.state;
    const { path } = this.props.match;
    return (
      <div style={bgStyle}>
        <div className="container white-text">
          <h2 style={{ paddingTop: "25px" }}>
            {path === "/signinuser"
              ? "Zaloguj się jako User"
              : "Zaloguj się jako Trener"}
          </h2>
          <div className="row">
            <form className="col s12" onSubmit={this.onFormSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="email"
                    type="email"
                    className="validate white-text"
                    value={email}
                    onChange={this.onInputChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                  <span
                    className="helper-text white-text"
                    data-error=""
                    data-success=""
                  />
                </div>

                <div className="input-field col s12">
                  <input
                    id="password"
                    type="text"
                    className="validate white-text"
                    value={password}
                    onChange={this.onInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <span
                    className="helper-text white-text"
                    data-error="Hasło nieprawidłowe. Podaj prawidłowe hasło."
                    data-success="dobrze"
                  />
                </div>
              </div>
              <button className="btn" type="submit">
                Zaloguj
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const bgStyle = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(https://images.pexels.com/photos/685534/pexels-photo-685534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
  position: "relative",
  top: "-36px",
  left: "0",
  width: "100%",
  height: "100vh",
  margin: "0",
  padding: "0",
  backgroundPosition: "center",
  backgroundSize: "cover"
};

const mapStateToProps = state => {
  const trainers = state.firestore.ordered.trainers;
  const users = state.firestore.ordered.users;

  return {
    users,
    trainers
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    // check this line
    // { collection: "users", subCollections: [{ collection: "trainers" }] }
    { collection: "users" },
    { collection: "trainers" }
  ])
)(SignIn);
