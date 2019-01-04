export const actionTypes = {
  FETCH_BEGIN: 'controllingAccounts/FETCH_BEGIN',
  FETCH_SUCCESS: 'controllingAccounts/FETCH_SUCCESS',
  FETCH_FAIL: 'controllingAccounts/FETCH_FAIL',
  RESET: 'controllingAccounts/RESET',
  SELECT_NODE: 'controllingAccounts/SELECT_NODE',
  UPDATE_NODE: 'controllingAccounts/UPDATE_NODE'
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

/**
 * Action used to mark as selected the specified item and its children.
 */
export const select = (nodes, node) => ({
  type: actionTypes.SELECT_NODE,
  payload: {
    nodes,
    node
  }
});

/**
 * Action used to update a prop in the specified item.
 */
export const update = (nodes, node) => ({
  type: actionTypes.UPDATE_NODE,
  payload: {
    nodes,
    node
  }
});
