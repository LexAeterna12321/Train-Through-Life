import React, { Component } from "react";
import { Link } from "react-router-dom";

class Profile extends Component {
  render() {
    return (
      <div className="card col s12 m8 l3 offset-m2 ">
        <div className="avatar-photo" style={avatarContainer}>
          <img
            src="/img/avatar.png"
            className="circle center"
            alt="profile avatar"
            style={avatarStyle}
          />
        </div>

        <div className="card-title center ">
          <h3>Ania Rubik</h3>
          <h5>Wrocław</h5>
        </div>

        <div className="card-action">
          <Link to="/">
            <h6 style={profileSectionsStyle}>Moje Treningi</h6>
          </Link>
          <Link to="/">
            <h6 style={profileSectionsStyle}>Historia Treningów</h6>
          </Link>
          <Link to="/">
            <h6 style={profileSectionsStyle}>Edytuj Profil</h6>
          </Link>
        </div>
      </div>
    );
  }
}

const avatarStyle = {
  width: "80%",
  display: "block",
  margin: "0 auto"
};

const profileSectionsStyle = {
  lineHeight: "3rem"
};

const avatarContainer = {
  padding: "10px 0",
  borderBottom: "2px solid gray"
};

export default Profile;
