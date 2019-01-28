import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/auth";
const Navbar = props => {
  const signOut = () => {
    props.signOut();
    props.history.push("/");
  };
  console.log(props);
  return (
    <nav>
      <div className="nav-wrapper teal lighten-1">
        <NavLink to="/" className="brand-logo center truncate ">
          TRAIN THROUGH LIFE
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {!props.auth.isEmpty ? (
            <React.Fragment>
              <li>
                <button className="btn" style={buttonsStyle}>
                  Start
                </button>
              </li>
              <li>
                <button className="btn" style={buttonsStyle} onClick={signOut}>
                  Wyloguj
                </button>
              </li>
            </React.Fragment>
          ) : null}
          <li>
            <NavLink
              to="/about"
              className=" btn-floating waves-effect waves-light yellow darken-1"
            >
              <i className="material-icons">info</i>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const buttonsStyle = {
  margin: "0 5px"
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};
const mapStateToProps = state => {
  console.log(state);
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
