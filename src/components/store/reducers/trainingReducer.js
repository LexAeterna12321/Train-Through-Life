import { ADD_TRAINING, EDIT_TRAINING, EDIT_TRAINING_ERROR } from "../types";

const initState = {
  orderedClasses: [{ name: "kot", duration: 0, totalCost: 0 }]
};

export default (state = initState, action) => {
  const training = action.training;
  const trainingStatus = action.trainingStatus;
  switch (action.type) {
    case ADD_TRAINING:
      return { ...state, training };
    case EDIT_TRAINING:
      return { ...state, trainingStatus };
    case EDIT_TRAINING_ERROR:
      return { ...state, trainingStatus };
    default:
      return state;
  }
};
