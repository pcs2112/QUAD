/**
 * Creates selector function to detect if a state slice if fetching async data.
 *
 * @param {String} stateName
 * @returns {function(*): boolean}
 */
export const createGetIsFetchingSelector = stateName => state => (
  state[stateName].dataLoaded === false || state[stateName].isFetching
);
