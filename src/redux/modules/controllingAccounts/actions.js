import { catchValidation } from 'helpers/redux';

export const actionTypes = {
  FETCH_BEGIN: 'controllingAccounts/FETCH_BEGIN',
  FETCH_SUCCESS: 'controllingAccounts/FETCH_SUCCESS',
  FETCH_FAIL: 'controllingAccounts/FETCH_FAIL',
  RESET: 'controllingAccounts/RESET',
  EXPAND: 'controllingAccounts/EXPAND',
  SELECT: 'controllingAccounts/SELECT',
  ADD: 'controllingAccounts/ADD',
  UPDATE: 'controllingAccounts/UPDATE',
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
 * Action used to expand an item.
 */
export const expand = (item, isExpanded) => ({
  type: actionTypes.EXPAND,
  payload: {
    item,
    isExpanded
  }
});

/**
 * Action used to select an item.
 */
export const select = (item, isSelected) => ({
  type: actionTypes.SELECT,
  payload: {
    item,
    isSelected
  }
});

/**
 * Action used to add an item.
 */
export const add = item => ({
  type: actionTypes.ADD,
  payload: {
    item,
    parentId: item.p_ctrl_acct_id
  }
});

/**
 * Action used to update an item.
 */
export const update = item => ({
  type: actionTypes.UPDATE,
  payload: {
    item
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
