import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import editProfile from "../../store/actions/editProfile";

import { storage } from "../../../fbConfig/index";

export class EditProfile extends Component {
  state = {
    profileData: {
      email: "",
      password: "",
      city: "",
      phone: ""
    },
    url: "",
    profileLoaded: false,
    photoReady: true
  };

  componentDidMount() {
    this.setState({ profileLoaded: false });
    this.uploadProfile();
  }

  componentDidUpdate() {
    if (!this.state.profileLoaded && this.props.profile) {
      this.uploadProfile();
    }
  }

  uploadProfile = () => {
    const profile = this.props.profile;

    this.setState({ profileData: { ...profile }, profileLoaded: true });
  };

  onPhotoUpload = e => {
    if (e.target.files[0]) {
      const url = e.target.files[0];

      this.setState({ url });

      /////////////////////////
      const storageRef = storage.ref();
      const imagesRef = storageRef.child(
        `avatar_photos/${this.state.profileData.email}`
      );
      const uploadTask = imagesRef.put(url);
      uploadTask.on(
        "state_changed",
        snapshot => {
          this.setState({ photoReady: false });
        },
        error => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({ photoReady: true });
          });
        }
      );
      /////////////////////////
    }
  };

  onInputChange = e => {
    console.log(e.target.value);
    this.setState({
      profileData: { ...this.state.profileData, [e.target.id]: e.target.value }
    });

    console.log(this.state);
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ profileLoaded: false });
    const id = this.props.match.params.id;

    if (this.state.url) {
      // create firebase storage reference
      const storageRef = storage.ref();
      const oldProfileRef = storageRef.child(
        `avatar_photos/${this.props.profile.email}`
      );
      const imagesRef = storageRef.child(
        `avatar_photos/${this.state.profileData.email}`
      );
      imagesRef.put(this.state.url).then(snapshot => {
        console.log({ snapshot });
      });

      // deleting the old avatar in old profile
      oldProfileRef
        .delete()
        .then(function() {
          console.log("stary img usunięty");
        })
        .catch(function(error) {
          console.log("error w usuwaniu starego img");
          console.log(error);
        });
    }

    this.props.editProfile(this.state.profileData, id);
    this.props.history.push(`/dashboard/${id}`);
  };

  render() {
    console.log(this.state);
    const { email, password, city, phone } = this.state.profileData;

    const { onFormSubmit, onInputChange, onPhotoUpload } = this;
    const { photoReady, url } = this.state;
    return (
      <div className="container center">
        <h3>Edytuj profil</h3>

        <div className="row">
          <form className="col s12" onSubmit={onFormSubmit}>
            <div className="row ">
              <div className="input-field col s6">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  type="text"
                  className="validate"
                  required
                  value={email}
                  onChange={onInputChange}
                />
                {/* <label htmlFor="icon_prefix active ">Email</label> */}
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  id="password"
                  type="text"
                  className="validate"
                  required
                  value={password}
                  onChange={onInputChange}
                />
                {/* <label htmlFor="icon_prefix ">Hasło</label> */}
              </div>

              <div className="input-field col s6">
                <i className="material-icons prefix">location_city</i>
                <input
                  id="city"
                  type="text"
                  className="validate"
                  required
                  value={city}
                  onChange={onInputChange}
                />
                {/* <label htmlFor="icon_prefix">Miasto</label> */}
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix ">photo_camera</i>
                <input
                  id="photo"
                  type="file"
                  className="validate btn"
                  onChange={onPhotoUpload}
                  //
                />
                {/* <label htmlFor="photo" className="active">
                    Zdjęcie
                  </label> */}
              </div>

              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="phone"
                  type="tel"
                  className="validate"
                  required
                  value={phone}
                  onChange={this.onInputChange}
                />
                {/* <label htmlFor="icon_telephone">Nr Telefonu</label> */}
              </div>
            </div>
            <h6>
              W przypadku zmiany hasła lub adresu e-mail zostaniesz wylogowany
            </h6>
            <button className={photoReady ? "btn" : "btn disabled"}>
              Zatwierdź zmiany
            </button>
            {!photoReady && url ? <h6>Ładuję zdjęcie profilowe</h6> : null}
            {photoReady && url ? <h6>Zdjęcie profilowe załadowane</h6> : null}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  const users = state.firestore.data.users;
  const trainers = state.firestore.data.trainers;

  const profiles = { ...users, ...trainers };

  const profile = profiles[id];

  return {
    profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editProfile: (profile, id) => dispatch(editProfile(profile, id))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }, { collection: "trainers" }])
)(EditProfile);
