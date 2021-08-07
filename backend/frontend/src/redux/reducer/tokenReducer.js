import { SAVE_USER_DETAILS } from "../actions";
import { CLEAR_USER_DETAILS } from "../actions";
function manageUserState(state = { user_details: {} }, action) {
  switch (action.type) {
    case SAVE_USER_DETAILS:
      return { ...state, user_details: action.payload };
    case CLEAR_USER_DETAILS:
      return { ...state, user_details: {} };
    default:
      return state;
  }
}
export default manageUserState;
