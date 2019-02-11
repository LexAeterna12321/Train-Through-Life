import React, { Component } from "react";
import { Link } from "react-router-dom";
import { storage } from "../../../fbConfig/index";
class Profile extends Component {
  state = { url: "" };
  renderProfileLinks = () => {
    const { profileId, profile } = this.props;

    return profile.user ? (
      <div className="card-action">
        <Link to={`/traininghistory/${profileId}`}>
          <h6 style={profileSectionsStyle}>Historia Treningów</h6>
        </Link>
        <Link to={`/editprofile/${profileId}`}>
          <h6 style={profileSectionsStyle}>Edytuj Profil</h6>
        </Link>
        <Link to={`/editphoto/${profileId}`}>
          <h6 style={profileSectionsStyle}>Edytuj Zdjęcie</h6>
        </Link>
      </div>
    ) : (
      <div className="card-action">
        <Link to={`/traininghistory/${profileId}`}>
          <h6 style={profileSectionsStyle}>Historia Treningów</h6>
        </Link>
        <Link to={`/editprofile/${profileId}`}>
          <h6 style={profileSectionsStyle}>Edytuj Profil</h6>
        </Link>
        <Link to={`/editphoto/${profileId}`}>
          <h6 style={profileSectionsStyle}>Edytuj Zdjęcie</h6>
        </Link>
        <Link to={`/trainerdescription/${profileId}`}>
          <h6 style={profileSectionsStyle}>Zarządzaj Opisem Profilu</h6>
        </Link>
        <Link to={`/trainerclasses/${profileId}`}>
          <h6 style={profileSectionsStyle}>Zarządzaj Treningami</h6>
        </Link>
      </div>
    );
  };

  componentDidMount() {
    this.getAvatarPhoto();
  }
  componentDidUpdate() {
    if (!this.state.url) {
      this.getAvatarPhoto();
    }
  }
  getAvatarPhoto = () => {
    const { uid } = this.props;

    // firebase storage
    const storageRef = storage.ref();
    if (uid) {
      return storageRef
        .child(`avatar_photos/${uid}`)
        .getDownloadURL()
        .then(url => {
          this.setState({ url });
        })
        .catch(err => {
          // default photo if no photo provided

          this.setState({ url: "./img/avatar.png" });
        });
    }
  };

  render() {
    if (this.props.profile) {
      const { first_name, last_name, city } = this.props.profile;
      const { profile } = this.props;
      const { url } = this.state;

      return (
        <div
          className={
            profile.user
              ? "card col s12 m8 l3 offset-m2 offset-l1"
              : "card col s12 m4 offset-m1 l4 offset-l1 "
          }
        >
          <div className="avatar-photo" style={avatarContainer}>
            <img
              src={url}
              className="circle center"
              alt="profile avatar"
              style={avatarStyle}
            />
          </div>

          <div className="card-title center ">
            <h3>
              {first_name} {last_name}
            </h3>
            <h5>
              {city
                .charAt(0)
                .toUpperCase()
                .concat(city.substr(1))
                .trim()}
            </h5>
          </div>
          {this.renderProfileLinks()}
        </div>
      );
    } else {
      return null;
    }
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
