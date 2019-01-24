import { ADD_TRAINING, ADD_TRAINING_ERROR } from "../types";
export default training => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    // popracować nad dodaniem treningu do bazy. Może wydzielić nowe collection notifications, żeby trzymało wszystkie zamówienia i po prostu mapowało na dashboardzie w zależności kto jest zalogowany.

    firestore
      .collection("users")
      .add({ orderedClasses: [...training], createdAd: new Date() })
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
