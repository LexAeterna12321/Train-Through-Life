import { ADD_TRAINING } from "../types";
export default training => {
  return (dispatch, ownProps) => {
    dispatch({
      type: ADD_TRAINING,
      training
    });
  };
};
