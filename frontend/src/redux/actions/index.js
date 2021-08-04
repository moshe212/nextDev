/*
 * action types
 */
export const SAVE_USER_DETAILS = "SAVE_DETAILS";
export const CLEAR_USER_DETAILS = "CLEAR_DETAILS";
/*
 * action creators
 */

export function saveUserDetails(userdetails) {
  return { type: SAVE_USER_DETAILS, payload: userdetails };
}

export function clearUserDetails() {
  return { type: CLEAR_USER_DETAILS };
}
