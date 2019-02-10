// import { storage } from "../../../fbConfig/index";

// onPhotoUpload = e => {
//   if (e.target.files[0]) {
//     const url = e.target.files[0];

//     this.setState({ url });

//     const storageRef = storage.ref();
//     const imagesRef = storageRef.child(
//       `avatar_photos/${this.state.profileData.email}`
//     );
//     const uploadTask = imagesRef.put(url);
//     uploadTask.on(
//       "state_changed",
//       snapshot => {
//         this.setState({ photoReady: false });
//       },
//       error => {
//         console.log(error);
//       },
//       () => {
//         uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
//           this.setState({ photoReady: true });
//         });
//       }
//     );
//   }
// };

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
// {
//   !photoReady && url ? <h6>Ładuję zdjęcie profilowe</h6> : null;
// }
// {
//   photoReady && url ? <h6>Zdjęcie profilowe załadowane</h6> : null;
// }
// {
//   password && password.length < 6 ? (
//     <h6 className="red-text">Hasło musi mieć conajmniej 6 znaków</h6>
//   ) : null;
// }
