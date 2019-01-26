import { ADD_TRAINING, ADD_TRAINING_ERROR } from "../types";
export default (training, info) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("notifications")
      .add({
        training,
        info,
        createdAd: new Date()
      })
      .then(() => {
        dispatch({
          type: ADD_TRAINING,
          training
        });
      })
      .catch(err => {
        dispatch({ type: ADD_TRAINING_ERROR, err });
      });
  };
};
