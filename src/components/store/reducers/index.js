import { combineReducers } from "redux";
import trainingOrders from "./trainingOrders";
import trainerClasses from "./trainerClasses";
import userReducer from "./userReducer";
import { firestoreReducer } from "redux-firestore";

const combindedReducers = combineReducers({
  trainingOrders,
  trainerClasses,
  users: userReducer,
  firestore: firestoreReducer
});

export default combindedReducers;
