/*
 * action types
 */
// export const SAVE_TOKEN = "SAVE_TOKEN";
export const SAVE_USER_DETAILS = "SAVE_DETAILS";
/*
 * action creators
 */

export function saveUserDetails(userdetails) {
  return { type: SAVE_USER_DETAILS, payload: userdetails };
}
