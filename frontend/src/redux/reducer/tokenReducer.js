import { SAVE_TOKEN } from "../actions";
function manageToken(state = { token: "" }, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      // const oldItems = state.tokens || '';
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
export default manageToken;
