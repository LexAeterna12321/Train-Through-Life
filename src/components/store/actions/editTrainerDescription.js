import { EDIT_DESCRIPTION, EDIT_DESCRIPTION_ERROR } from "../types";

export default (description, profileId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    if (profileId) {
      const oldDescription = getState().firestore.data.trainers[profileId];

      // training status update due to trainer action
      const updatedDescription = { ...oldDescription, description };
      console.log(updatedDescription);
      firestore
        .collection("trainers")
        .doc(profileId)
        .set({
          ...updatedDescription,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({
            type: EDIT_DESCRIPTION,
            description
          });
        })
        .catch(err => {
          dispatch({ type: EDIT_DESCRIPTION_ERROR, err });
        });
    }
  };
};
