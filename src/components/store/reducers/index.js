import { combineReducers } from "redux";
import trainingOrders from "./trainingOrders";
import trainerClasses from "./trainerClasses";
import userReducer from "./userReducer";

const combindedReducers = combineReducers({
  trainingOrders,
  trainerClasses,
  users: userReducer
});

export default combindedReducers;
