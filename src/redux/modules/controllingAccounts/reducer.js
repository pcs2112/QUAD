import {
  itemListReducerFor,
  itemListReducerForInitalState,
} from 'javascript-utils/lib/redux/reducers';
import { actionTypes } from './actions';

// Initial state
const initialState = {
  ...itemListReducerForInitalState,
  loopupIdx: {}
};

// Create helper reducers
const itemListReducer = itemListReducerFor(actionTypes);

const fetchReducer = (state, action) => {
  const newState = itemListReducer(state, action);
  const { data } = newState;
  const parentsIdx = { 0: 1 };
  const loopupIdx = {};

  data.forEach((item) => {
    parentsIdx[item.p_ctrl_acct_id] = true;
  });

  newState.data = data.map((item, i) => {
    loopupIdx[item.id] = i;
    if (item.id === 1) {
      return {
        ...item,
        state: {
          isExpanded: true,
          hasChildren: true
        }
      };
    }

    return {
      ...item,
      state: {
        isExpanded: false,
        hasChildren: parentsIdx[item.id] || false
      }
    };
  });

  newState.loopupIdx = loopupIdx;

  return newState;
};

const expandReducer = (state, action) => {
  const { item, isExpanded } = action.payload;
  const { data, loopupIdx } = state;

  const index = loopupIdx[item.id];

  const newData = [
    ...data
  ];

  newData[index] = {
    ...item,
    state: {
      ...item.state,
      isExpanded
    }
  };

  return {
    ...state,
    data: newData
  };
};

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
    case actionTypes.FETCH_SUCCESS:
      return fetchReducer(state, action);
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
    case actionTypes.EXPAND:
      return expandReducer(state, action);
    default:
      return state;
  }
};
