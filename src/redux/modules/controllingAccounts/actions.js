export const actionTypes = {
  FETCH_BEGIN: 'controllingAccounts/FETCH_BEGIN',
  FETCH_SUCCESS: 'controllingAccounts/FETCH_SUCCESS',
  FETCH_FAIL: 'controllingAccounts/FETCH_FAIL',
  RESET: 'controllingAccounts/RESET'
};

/**
 * Action to fetch the controlling accounts data.
 */
export const fetch = () => ({
  types: [
    actionTypes.FETCH_BEGIN,
    actionTypes.FETCH_SUCCESS,
    actionTypes.FETCH_FAIL
  ],
  makeRequest: client => client.get('/api/controlling_accounts')
});

/**
 * Resets the state.
 */
export const reset = () => ({
  type: actionTypes.RESET
});
