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
      const { data } = newState;
      newState.data = data.map((item) => {
        if (item.id === 1) {
          return {
            ...item,
            state: {
              expanded: true
            }
          };
        }

        return item;
      });
      newState.nodes = treeify(newState.data, 'id', 'p_ctrl_acct_id');
      return newState;
    }
    case actionTypes.SINGLE_SELECT_NODE: {
      return treeNodeSelectReducer(state, action);
    }
    case actionTypes.ADD_NODE:
    case actionTypes.UPDATE_NODE: {
      return treeNodeUpdateReducer(state, action);
    }
    case actionTypes.CREATE_SUCCESS: {
      const newNode = action.response[0];
      return {
        ...state,
        data: [
          ...state.data,
          { ...newNode }
        ]
      };
    }
    default:
      return state;
  }
};
