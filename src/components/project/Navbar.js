import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper teal lighten-1">
        <NavLink to="/" className="brand-logo center truncate ">
          TRAIN THROUGH LIFE
        </NavLink>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/">Start</NavLink>
          </li>
          <li>
            <NavLink to="/">Home Page</NavLink>
          </li>
          <li>
            <div>
              <NavLink
                to="/about"
                className=" btn-floating waves-effect waves-light red"
              >
                <i className="material-icons">info</i>
              </NavLink>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
