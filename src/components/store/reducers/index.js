import { combineReducers } from "redux";
import trainingOrders from "./trainingOrders";

import userReducer from "./userReducer";
import { firestoreReducer } from "redux-firestore";

const combindedReducers = combineReducers({
  trainingOrders,

  users: userReducer,
  firestore: firestoreReducer
});

export default combindedReducers;
