import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { signIn } from "../../store/actions/auth";
import { Link } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    loginError: false,
    userAsTrainerLoginError: false //dokończyć!!
  };
  ref = React.createRef();

  onInputChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  passwordShowToggle = () => {
    this.ref.current.type === "password"
      ? (this.ref.current.type = "text")
      : (this.ref.current.type = "password");
  };

  onFormSubmit = e => {
    e.preventDefault();

    //
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

    if (!userMatched) {
      this.setState({ loginError: true });
      return;
    }
    // matching if user is logging through user signIn and if trainer is logging through trainer signIn
    if (
      (userMatched.trainer && this.props.match.path === "/signintrainer") ||
      (userMatched.user && this.props.match.path === "/signinuser")
    ) {
      const id = userMatched.id;
      // login through firebase auth
      this.props.signIn(this.state);
      this.props.history.push(`/dashboard/${id}`);
    } else {
      this.setState({ userAsTrainerLoginError: true });

      return console.log(
        "Brak usera w bazie, lub user loguje się jako trener lub odwrotnie"
      );
    }
    this.setState({ email: "", password: "" });
  };

  render() {
    const { email, password, loginError, userAsTrainerLoginError } = this.state;
    const { path } = this.props.match;
    const { authError } = this.props;
    return (
      <div style={bgStyle}>
        <div className="container white-text">
          <h2 style={{ paddingTop: "30px", marginTop: "0" }}>
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
                    className=" white-text"
                    value={email}
                    onChange={this.onInputChange}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                <div className="input-field col s12">
                  {" "}
                  <input
                    ref={this.ref}
                    id="password"
                    type="password"
                    className="white-text"
                    value={password}
                    onChange={this.onInputChange}
                    required
                  />{" "}
                  <i
                    style={{ cursor: "pointer" }}
                    className="material-icons right grey-text"
                    onClick={this.passwordShowToggle}
                  >
                    remove_red_eye
                  </i>
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <Link to="/" className="btn" style={buttonStyle}>
                Powrót
              </Link>
              <button className="btn" type="submit" style={buttonStyle}>
                Zaloguj
              </button>
              {authError ? (
                <h5 className="red-text text-darken-2 center">{authError}</h5>
              ) : null}
              {loginError ? (
                <h5 className="red-text text-darken-2 center">
                  Adres email lub hasło jest nieprawidłowe
                </h5>
              ) : null}
              {userAsTrainerLoginError ? (
                <h5 className="red-text text-darken-2 center">
                  Próbujesz logowania poprzez błędne okno
                </h5>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const buttonStyle = {
  margin: "0 10px"
};

const bgStyle = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.2)), url(https://images.pexels.com/photos/685534/pexels-photo-685534.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)",
  position: "relative",
  top: "0",
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
  const authError = state.auth.authError;

  return {
    users,
    trainers,
    authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),

  firestoreConnect([{ collection: "users" }, { collection: "trainers" }])
)(SignIn);
