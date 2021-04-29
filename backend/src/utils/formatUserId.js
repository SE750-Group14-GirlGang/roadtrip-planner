/**
 * Auth0 stores the user's id in the sub parameter with a prefix (e.g "auth0|")
 * This functions removes the prefix so that it matches the format of the id stored
 * for a user on the MongoDB database
 * @param {String} sub
 * @returns {String} the sub string with the prefix removed
 */
export default function formatUserId(sub) {
  return sub.split('|')[1];
}
