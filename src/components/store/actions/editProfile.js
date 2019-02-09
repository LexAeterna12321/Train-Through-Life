import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from "../types";

export const editProfile = (profile, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const firebase = getFirebase();

    const user = firebase.auth().currentUser;

    const { email, password } = profile;
    console.log({ profile });
    console.log({ user });

    user
      .updateEmail(email)
      .then(function() {
        console.log("zmiana maila");
      })
      .catch(function(error) {
        console.log("błąd zmiany maila", error);
      })
      .then(() => {
        user
          .updatePassword(password)
          .then(function() {
            console.log("zmiana hasła");
          })
          .catch(function(error) {
            console.log("błąd zmiany hasła", error);
          });
      });

    const oldProfile = getState().firestore.data.users[id]
      ? getState().firestore.data.users[id]
      : getState().firestore.data.trainers[id];

    const updatedProfile = { ...oldProfile, ...profile };
    console.log({ oldProfile, profile, id });
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
