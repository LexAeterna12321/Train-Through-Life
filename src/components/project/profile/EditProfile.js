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
      photo: "",
      phone: ""
    },
    profileLoaded: false
  };

  componentDidUpdate() {
    // fetching data from firebase and then apply them to state
    if (!this.state.profileLoaded) {
      this.renderProfileBeforeUpdate();
    }
  }

  componentWillUnmount() {
    this.setState({ profileData: {} });
  }

  renderProfileBeforeUpdate = () => {
    const { email, password, city, photo, phone } = this.props.profile;
    const id = this.props.match.params.id;
    console.log({ id });
    console.log(this.props.profile);
    this.setState({
      profileLoaded: true,
      profileData: {
        ...this.state.profileData,
        email,
        password,
        city,
        photo,
        phone
      }
    });
  };

  onInputChange = e => {
    console.log(e.target.value);
    this.setState({
      profileData: { ...this.state.profileData, [e.target.id]: e.target.value }
    });
    console.log(this.state.profileData);
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState({ profileLoaded: false });
    const id = this.props.match.params.id;
    this.props.editProfile(this.state.profileData, id);
    this.props.history.push(`/dashboard/${id}`);
  };

  render() {
    if (this.props.profile) {
      const { email, password, city, photo, phone } = this.state.profileData;
      const { onFormSubmit, onInputChange } = this;

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
                  <label htmlFor="icon_prefix active active">Email</label>
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
                  <label htmlFor="icon_prefix ">Hasło</label>
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
                  <label htmlFor="icon_prefix">Miasto</label>
                </div>
                <div className="input-field col s6">
                  <i className="material-icons prefix ">photo_camera</i>
                  <input
                    id="photo"
                    type="file"
                    className="validate btn"
                    src={photo}
                    onChange={onInputChange}

                    //
                  />
                  <label htmlFor="photo" className="active">
                    Zdjęcie
                  </label>
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
                  <label htmlFor="icon_telephone">Nr Telefonu</label>
                </div>
              </div>
              <button className="btn">Zatwierdź zmiany</button>
            </form>
          </div>
        </div>
      );
    }
    return <div>Loading content...</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;

  const users = state.firestore.data.users;
  const trainers = state.firestore.data.trainers;

  const profiles = { ...users, ...trainers };

  const profile = profiles ? profiles[id] : null;
  console.log({ profile });

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
