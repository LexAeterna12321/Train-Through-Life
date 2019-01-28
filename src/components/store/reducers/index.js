import { combineReducers } from "redux";
import trainingOrders from "./trainingOrders";

import userReducer from "./userReducer";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
const combindedReducers = combineReducers({
  trainingOrders,
  auth: authReducer,
  users: userReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default combindedReducers;
