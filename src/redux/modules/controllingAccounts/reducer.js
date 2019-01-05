import { treeify } from 'javascript-utils/lib/array';
import {
  itemListReducerFor,
  itemListReducerForInitalState,
  treeNodeSelectReducerFor,
  treeNodeUpdateReducerFor,
  treeNodeSelectReducerForInitalState
} from 'javascript-utils/lib/redux/reducers';
import { actionTypes } from './actions';

// Initial state
const initialState = {
  ...itemListReducerForInitalState,
  ...treeNodeSelectReducerForInitalState
};

// Create helper reducers
const itemListReducer = itemListReducerFor(actionTypes);
const treeNodeSelectReducer = treeNodeSelectReducerFor(actionTypes);
const treeNodeUpdateReducer = treeNodeUpdateReducerFor(actionTypes);

/**
 * Controlling accounts reducer.
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BEGIN:
    case actionTypes.FETCH_FAIL:
    case actionTypes.RESET: {
      return itemListReducer(state, action);
    }
    case actionTypes.FETCH_SUCCESS: {
      const newState = itemListReducer(state, action);
      newState.nodes = treeify(newState.data, 'id', 'p_ctrl_acct_id');
      return newState;
    }
    case actionTypes.SELECT_NODE: {
      return treeNodeSelectReducer(state, action);
    }
    case actionTypes.ADD_NODE: {
      return treeNodeSelectReducer(state, action);
    }
    case actionTypes.UPDATE_NODE: {
      return treeNodeUpdateReducer(state, action);
    }
    default:
      return state;
  }
};
