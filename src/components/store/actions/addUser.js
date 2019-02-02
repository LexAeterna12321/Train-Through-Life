import { ADD_USER, ADD_USER_ERROR, ADD_TRAINER } from "../types";

export default user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    console.log(user);

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(resp => {
        return firestore
          .collection(user.user ? "users" : "trainers")
          .doc(resp.user.uid)
          .set({ ...user, createdAt: new Date() })
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
          });
      })
      .catch(err => {
        dispatch({
          type: ADD_USER_ERROR,
          authError: err.message
        });
      });
  };
};
