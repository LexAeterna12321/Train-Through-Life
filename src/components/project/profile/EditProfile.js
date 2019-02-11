import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import editProfile from "../../store/actions/editProfile";

export class EditProfile extends Component {
  state = {
    profileData: {
      email: "",
      password: "",
      city: "",
      phone: ""
    },
    profileLoaded: false
  };

  componentDidMount() {
    this.setState({ profileLoaded: false });
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

  onInputChange = e => {
    this.setState({
      profileData: { ...this.state.profileData, [e.target.id]: e.target.value }
    });
  };

  onFormSubmit = e => {
    e.preventDefault();
    if (this.state.profileData.password.length < 6) return;
    const { profileData } = this.state;
    this.setState({ profileLoaded: false });
    const id = this.props.match.params.id;

    this.props.editProfile(profileData, id);
    this.props.history.push(`/dashboard/${id}`);
  };

  render() {
    const { email, password, city, phone } = this.state.profileData;

    const { onFormSubmit, onInputChange } = this;

    return (
      <div className="container center">
        <h3>Edytuj profil</h3>

        <div className="row">
          <form className="col s12" onSubmit={onFormSubmit}>
            <div className="row ">
              <div className="input-field col s10 m6">
                <i className="material-icons prefix">email</i>
                <input
                  id="email"
                  type="text"
                  className="validate"
                  required
                  value={email}
                  onChange={onInputChange}
                />
              </div>
              <div className="input-field col s10 m6">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  id="password"
                  type="text"
                  className="validate"
                  required
                  value={password}
                  onChange={onInputChange}
                />
              </div>

              <div className="input-field col s10 m6">
                <i className="material-icons prefix">location_city</i>
                <input
                  id="city"
                  type="text"
                  className="validate"
                  required
                  value={city}
                  onChange={onInputChange}
                />
              </div>
              <div className="input-field col s10 m6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="phone"
                  type="tel"
                  placeholder="numer musi być dziewięciocyfrowy"
                  className="validate"
                  pattern="[0-9]{9}"
                  value={phone}
                  onChange={this.onInputChange}
                />
              </div>
            </div>

            <button
              className={
                password && password.length < 6 ? "btn disabled" : "btn"
              }
            >
              Zatwierdź zmiany
            </button>
            {password && password.length < 6 ? (
              <h6 className="red-text">Hasło musi mieć conajmniej 6 znaków</h6>
            ) : null}
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
