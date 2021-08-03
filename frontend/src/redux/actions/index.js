/*
 * action types
 */
export const SAVE_TOKEN = "ADD_ITEM";
/*
 * action creators
 */
export function saveToken(token) {
  return { type: SAVE_TOKEN, payload: token };
}
