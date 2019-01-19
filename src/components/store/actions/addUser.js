import { ADD_USER } from "../types";
import { ADD_TRAINER } from "../types";

export default user => {
  return (dispatch, ownProps) => {
    console.log(user);
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
  };
};
