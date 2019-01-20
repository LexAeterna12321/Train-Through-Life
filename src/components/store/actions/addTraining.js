import { ADD_TRAINING } from "../types";
export default training => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TRAINING,
      training
    });
  };
};
