import { combineReducers } from "redux";
import trainingReducer from "./trainingReducer";
import userReducer from "./userReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
const combindedReducers = combineReducers({
  trainingReducer,
  auth: authReducer,
  users: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default combindedReducers;
