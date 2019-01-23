import { EDIT_PROFILE, EDIT_PROFILE_ERROR } from "../types";

export const editProfile = (profile, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    const oldProfile = getState().firestore.data.users[id];
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
