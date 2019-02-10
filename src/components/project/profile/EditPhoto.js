import React, { Component } from "react";
import { storage } from "../../../fbConfig/index";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link, Redirect } from "react-router-dom";

class EditPhoto extends Component {
  state = { photo: "", photoReady: false, uploadProgress: 0, redirect: false };

  onPhotoUpload = e => {
    if (e.target.files[0]) {
      const photo = e.target.files[0];
      this.setState({ photo, photoReady: true });
    }
  };
  onFormSubmit = e => {
    e.preventDefault();

    const storageRef = storage.ref();
    const imagesRef = storageRef.child(`avatar_photos/${this.props.auth.uid}`);
    const uploadTask = imagesRef.put(this.state.photo);
    uploadTask.on(
      "state_changed",
      snapshot => {
        let progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ uploadProgress: progress });
      },
      error => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          setTimeout(() => {
            this.setState({ redirect: true });
          }, 1000);
        });
      }
    );
  };
  render() {
    const { photoReady, uploadProgress, redirect, photo } = this.state;
    console.log(this.state);
    console.log(this.props.auth);
    const { onFormSubmit } = this;
    return (
      <div className="container center">
        <h3>Edytuj Zdjęcie</h3>
        {redirect ? <Redirect to={`/dashboard/${this.props.id}`} /> : null}
        <div className="row">
          <form className="col s12" onSubmit={onFormSubmit}>
            <div className="row center">
              <div className="input-field col s12">
                <div className="btn">
                  <input type="file" onChange={this.onPhotoUpload} />{" "}
                </div>
              </div>
            </div>
            <Link
              to={`/dashboard/${this.props.id}`}
              className="btn"
              style={linkStyle}
            >
              Powrót
            </Link>
            <button
              className={!photo ? "btn disabled" : "btn"}
              style={linkStyle}
            >
              Zatwierdź wybór
            </button>
          </form>
          <progress value={this.state.uploadProgress} max="100" />
          {uploadProgress !== 0 && uploadProgress !== 100 ? (
            <h6 className="yellow-text">Ładuję zdjęcie profilowe</h6>
          ) : null}
          {photoReady && uploadProgress === 100 ? (
            <h6 className="green-text">Zdjęcie profilowe załadowane</h6>
          ) : null}
        </div>
      </div>
    );
  }
}

const linkStyle = {
  margin: "0px 5px 5px 5px"
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.profileId;

  const users = state.firestore.data.users;
  const trainers = state.firestore.data.trainers;

  const profiles = { ...users, ...trainers };

  const profile = profiles[id] || "";

  const email = profile.email;

  return { id, email, auth: state.firebase.auth };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "users" }, { collection: "trainers" }])
)(EditPhoto);

// // create firebase storage reference
// const storageRef = storage.ref();

// const imgRef = storageRef.child(`avatar_photos/${this.props.profile.email}`);

// const emailChanged = this.state.profileData.email !== this.props.profile.email;

// // email changed / no new photo / img already exists in storage

// if (emailChanged && imgRef && this.state.url) {
//   imgRef.put(this.state.url).then(snapshot => {
//     console.log({ snapshot });
//   });

//   const oldProfileRef = storageRef.child(
//     `avatar_photos/${this.props.profile.email}`
//   );

//   // deleting the old avatar in old profile
//   oldProfileRef
//     .delete()
//     .then(function() {
//       console.log("stary img usunięty");
//     })
//     .catch(function(error) {
//       console.log("error w usuwaniu starego img");
//       console.log(error);
//     });
// }
// //   else if (emailChanged && this.state.url && imgRef) {
// //   imgRef.put(this.state.url).then(snapshot => {
// //     console.log({ snapshot });
// //   });

// //   const oldProfileRef = storageRef.child(
// //     `avatar_photos/${this.props.profile.email}`
// //   );

// //   // deleting the old avatar in old profile
// //   oldProfileRef
// //     .delete()
// //     .then(function() {
// //       console.log("stary img usunięty");
// //     })
// //     .catch(function(error) {
// //       console.log("error w usuwaniu starego img");
// //       console.log(error);
// //     });
// // } else if (!emailChanged && this.state.url && imgRef) {
// //   imgRef.put(this.state.url).then(snapshot => {
// //     console.log({ snapshot });
// //   });
// // }
// <div className="input-field col s10 m6">
//   <i className="material-icons prefix ">photo_camera</i>
//   <input
//     id="photo"
//     type="file"
//     className="validate btn"
//     onChange={onPhotoUpload}
//     //
//   />
// </div>;
