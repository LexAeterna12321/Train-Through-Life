import { ADD_TRAINING, EDIT_TRAINING, EDIT_TRAINING_ERROR } from "../types";

const initState = {
  orderedClasses: [{ name: "kot", duration: 0, totalCost: 0 }]
};

export default (state = initState, action) => {
  const training = action.training;
  const trainingStatus = action.trainingStatus;
  switch (action.type) {
    case ADD_TRAINING:
      console.log("dodano trening");
      return { ...state, training };
    case EDIT_TRAINING:
      console.log("edytowano trening");
      return { ...state, trainingStatus };
    case EDIT_TRAINING_ERROR:
      console.log("error w edycji treningu");
      return { ...state, trainingStatus };
    default:
      console.log("nic nie dodano");
      return state;
  }
};
