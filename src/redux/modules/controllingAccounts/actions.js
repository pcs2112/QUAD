import { catchValidation } from 'helpers/redux';

export const actionTypes = {
  FETCH_BEGIN: 'controllingAccounts/FETCH_BEGIN',
  FETCH_SUCCESS: 'controllingAccounts/FETCH_SUCCESS',
  FETCH_FAIL: 'controllingAccounts/FETCH_FAIL',
  RESET: 'controllingAccounts/RESET',
  SELECT_NODE: 'controllingAccounts/SELECT_NODE',
  UPDATE_NODE: 'controllingAccounts/UPDATE_NODE',
  CREATE_BEGIN: 'controllingAccounts/CREATE_BEGIN',
  CREATE_SUCCESS: 'controllingAccounts/CREATE_SUCCESS',
  CREATE_FAIL: 'controllingAccounts/CREATE_FAIL'
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
export const selectNode = (nodes, node) => ({
  type: actionTypes.SELECT_NODE,
  payload: {
    nodes,
    node
  }
});

/**
 * Action used to update a prop in the specified item.
 */
export const updateNode = (nodes, node) => ({
  type: actionTypes.UPDATE_NODE,
  payload: {
    nodes,
    node
  }
});

/**
 * Action to create a new controlling account.
 *
 * @param {Object} data
 */
export const create = data => ({
  types: [
    actionTypes.CREATE_BEGIN,
    actionTypes.CREATE_SUCCESS,
    actionTypes.CREATE_FAIL
  ],
  makeRequest: client => client.post('/api/controlling_accounts', {
    data
  })
    .catch(catchValidation)
});
