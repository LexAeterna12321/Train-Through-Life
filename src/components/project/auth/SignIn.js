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

    const userEmail = this.state.email;
    const userPassword = this.state.password;

    const userMatched = this.props.users.find(user => {
      return userEmail === user.email && userPassword === user.password;
    });

    console.log(userMatched);

    if (userMatched) {
      const id = userMatched.id;
      this.props.history.push(`/dashboard/${id}`);
    } else {
      return console.log("Brak usera w bazie");
    }
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
  console.log(state);
  // return { users: state.users.users };
  return { users: state.firestore.ordered.users };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }])
)(SignIn);
