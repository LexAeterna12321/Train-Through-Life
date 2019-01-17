import React from "react";

import { Link } from "react-router-dom";

const AuthPreloader = () => {
  return (
    <div className="container center hoverable">
      <div className="row">
        <div className="col s12">
          <div className="card center-align">
            <div className="card-image">
              <img
                src="https://images.pexels.com/photos/116079/pexels-photo-116079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="training person"
              />
              <span className="card-title">Train Through Life</span>
            </div>
            <div className="card-content" style={authPreloaderStyle}>
              <h5>Train how You like. Share Your Passion. Training is You.</h5>
            </div>
            <div className="card-action  ">
              <Link
                to="/signinuser"
                className="center-align blue-text text-darken-2"
              >
                Login as User
              </Link>{" "}
              <Link
                to="/signintrainer"
                className="center-align blue-text text-darken-2"
              >
                Login as Trainer
              </Link>
            </div>

            <div className="card-action ">
              <Link to="/signup" className="blue-text text-darken-2">
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

export default AuthPreloader;
