import { EDIT_TRAINING, EDIT_TRAINING_ERROR } from "../types";
import { get } from "https";

export default (training, info) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const oldState = getState();
    console.log(oldState);
    firestore
      .collection("notifications")
      .set({
        training,
        info,
        createdAd: new Date()
      })
      .then(() => {
        dispatch({
          type: EDIT_TRAINING,
          training
        });
      })
      .catch(err => {
        dispatch({ type: EDIT_TRAINING_ERROR, err });
      });
  };
};
