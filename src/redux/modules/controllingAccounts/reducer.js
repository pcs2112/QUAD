import { itemListReducerFor, itemListReducerForInitalState } from 'javascript-utils/lib/redux/reducers';
import { actionTypes } from './actions';

// Initial state
const initialState = {
  ...itemListReducerForInitalState
};

// Create helper reducers
const itemListReducer = itemListReducerFor(actionTypes);

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
    case actionTypes.FETCH_SUCCESS:
    case actionTypes.RESET: {
      return itemListReducer(state, action);
    }
    default:
      return state;
  }
};
