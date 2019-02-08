import React from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

const AuthPreloader = ({ authError }) => {
  return (
    <div className="container center hoverable">
      <div className="row">
        <div className="col s12" style={{ padding: 0 }}>
          <div className="card center-align">
            <div className="card-image">
              <img
                src="https://images.pexels.com/photos/116079/pexels-photo-116079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="training person"
              />
              <span className="card-title">Personal Training App</span>
              <Link
                to="/about"
                className=" btn-floating halfway-fab waves-effect waves-light yellow darken-1"
              >
                <i className="material-icons">info</i>
              </Link>
            </div>
            <div className="card-content" style={authPreloaderStyle}>
              {authError ? (
                <h5 className="red-text text-lighten-1">
                  Podany adres email jest już używany przez innego użytkownika.
                  Spróbuj zarejestrować się przy użyciu innego adresu email.
                </h5>
              ) : (
                <h5>
                  Train how You like. Share Your Passion. Training is You.
                </h5>
              )}
            </div>
            <div className="card-action">
              <div className="row">
                <Link
                  to="/signinuser"
                  className="center-align text-darken-2 col s12 m3 offset-m2 btn"
                  style={{ marginBottom: "10px" }}
                >
                  Login as User
                </Link>{" "}
                <Link
                  to="/signintrainer"
                  className="center-align  text-darken-2 col s12 m3 offset-m2 btn"
                  style={{ marginBottom: "10px" }}
                >
                  Login as Trainer
                </Link>
              </div>
            </div>

            <div className="card-action ">
              <Link to="/signup" className=" text-darken-2 btn">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const authPreloaderStyle = {
  textTransform: "uppercase"
};

const mapStateToProps = state => {
  return {
    authError: state.users.authError
  };
};
export default connect(mapStateToProps)(AuthPreloader);
