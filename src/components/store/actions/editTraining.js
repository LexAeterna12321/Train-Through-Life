import { EDIT_TRAINING, EDIT_TRAINING_ERROR } from "../types";

export default (trainingStatus, trainingId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    if (trainingId) {
      const oldTraining = getState().firestore.data.notifications[trainingId];

      // training status update due to trainer action
      const updatedInfo = { ...oldTraining.info, trainingStatus };

      const updatedTraining = {
        ...oldTraining,
        info: updatedInfo
      };

      firestore
        .collection("notifications")
        .doc(trainingId)
        .set({
          ...updatedTraining,
          createdAt: new Date()
        })
        .then(() => {
          dispatch({
            type: EDIT_TRAINING,
            trainingStatus
          });
        })
        .catch(err => {
          dispatch({ type: EDIT_TRAINING_ERROR, err });
        });
    }
  };
};
