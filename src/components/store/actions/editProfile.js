import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from "../types";

export const editProfile = (profile, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;

    const { email, password } = profile;

    user
      .updateEmail(email)
      .then(function() {})
      .catch(function(error) {
        console.log(error);
      })
      .then(() => {
        user
          .updatePassword(password)
          .then(function() {})
          .catch(function(error) {
            console.log(error);
          });
      });

    const oldProfile = getState().firestore.data.users[id]
      ? getState().firestore.data.users[id]
      : getState().firestore.data.trainers[id];

    const updatedProfile = { ...oldProfile, ...profile };

    firestore
      .collection(oldProfile.user ? "users" : "trainers")
      .doc(id)
      .set(updatedProfile)
      .then(function() {
        dispatch({ type: EDIT_PROFILE });
      })
      .catch(function(err) {
        dispatch({ type: EDIT_PROFILE_ERROR, err });
      });
  };
};

export default editProfile;
