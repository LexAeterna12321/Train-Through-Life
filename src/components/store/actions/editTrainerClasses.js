import { EDIT_CLASSES, EDIT_CLASSES_ERROR } from "../types";

export const editClasses = (classes, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();

    const oldClasses = getState().firestore.data.trainers[id];

    // const updatedClasses = [...oldClasses.classes, [...classes]];
    const updatedClasses = { ...oldClasses, ...oldClasses[classes], classes };

    firestore
      .collection("trainers")
      .doc(id)
      .set(updatedClasses)
      .then(function() {
        dispatch({ type: EDIT_CLASSES });
      })
      .catch(function(err) {
        dispatch({ type: EDIT_CLASSES_ERROR, err });
      });
  };
};

export default editClasses;
