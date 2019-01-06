import { catchValidation } from 'helpers/redux';

export const actionTypes = {
  FETCH_BEGIN: 'controllingAccounts/FETCH_BEGIN',
  FETCH_SUCCESS: 'controllingAccounts/FETCH_SUCCESS',
  FETCH_FAIL: 'controllingAccounts/FETCH_FAIL',
  RESET: 'controllingAccounts/RESET',
  SINGLE_SELECT_NODE: 'controllingAccounts/SINGLE_SELECT_NODE',
  ADD_NODE: 'controllingAccounts/ADD_NODE',
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
 * Action used to mark a node and its children as selected.
 */
export const selectNode = (nodes, node) => ({
  type: actionTypes.SINGLE_SELECT_NODE,
  payload: {
    nodes,
    node
  }
});

/**
 * Action used to add a node.
 */
export const addNode = node => ({
  type: actionTypes.ADD_NODE,
  payload: {
    node,
    parentNodeId: node.p_ctrl_acct_id
  }
});

/**
 * Action used to update a node.
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
  makeRequest: client => client.post('/api/controlling_accounts/create', {
    data
  })
    .catch(catchValidation)
});
