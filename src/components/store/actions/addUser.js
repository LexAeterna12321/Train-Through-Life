import { ADD_USER, ADD_USER_ERROR, ADD_TRAINER } from "../types";

export default user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection(user.user ? "users" : "trainers")
      .add({ ...user, createdAd: new Date() })
      .then(() => {
        if (user.user) {
          dispatch({
            type: ADD_USER,
            user
          });
        } else if (user.trainer) {
          dispatch({
            type: ADD_TRAINER,
            user
          });
        }
      })
      .catch(err => {
        dispatch({ type: ADD_USER_ERROR, err });
      });
  };
};
