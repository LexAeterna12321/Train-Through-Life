import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../store/actions/auth";
import { Redirect } from "react-router-dom";
const Navbar = ({ auth, signOut }) => {
  if (!auth.uid) return <Redirect to="/" />;

  return (
    <nav>
      <div className="nav-wrapper teal lighten-1">
        <Link to="/" className="brand-logo center truncate ">
          TRAIN THROUGH LIFE
        </Link>
        <ul className="right hide-on-med-and-down">
          {!auth.isEmpty ? (
            <React.Fragment>
              <li>
                <Link
                  className="btn"
                  style={buttonsStyle}
                  to={`/dashboard/${auth.uid}`}
                >
                  Panel Główny
                </Link>
              </li>
              <li>
                <button className="btn" style={buttonsStyle} onClick={signOut}>
                  Wyloguj
                </button>
              </li>
            </React.Fragment>
          ) : null}
          <li>
            <Link
              to="/about"
              className=" btn-floating waves-effect waves-light yellow darken-1"
            >
              <i className="material-icons">info</i>
            </Link>
          </li>
        </ul>
        <ul
          className="right hide-on-large-only teal lighten-1"
          style={{ width: "100%" }}
        >
          <br />
          {!auth.isEmpty ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <li>
                <Link
                  className="btn"
                  style={(buttonsStyle, { padding: "0 5px" })}
                  to={`/dashboard/${auth.uid}`}
                >
                  Panel Główny
                </Link>
              </li>
              <li>
                <button
                  className="btn"
                  style={(buttonsStyle, { padding: "0 5p" })}
                  onClick={signOut}
                >
                  Wyloguj
                </button>
              </li>
              <li>
                <Link
                  to="/about"
                  className=" btn-floating waves-effect waves-light yellow darken-1"
                >
                  <i
                    className="material-icons tiny"
                    style={{ fontSize: "1.5rem" }}
                  >
                    info
                  </i>
                </Link>
              </li>
            </div>
          ) : null}
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
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
