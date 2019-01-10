import {
  itemListReducerFor,
  itemListReducerForInitalState,
} from 'javascript-utils/lib/redux/reducers';
import { getListIndicesLookupIdx } from 'helpers/utils';
import { actionTypes } from './actions';

// Initial state
const initialState = {
  ...itemListReducerForInitalState,
  lookupIdx: {},
  selectedId: false
};

// Create helper reducers
const itemListReducer = itemListReducerFor(actionTypes);

// Reducer used to handle fetching the controlling accounts
const fetchReducer = (state, action) => {
  const oldLookupIdx = { ...state.lookupIdx };
  const oldData = [...(state.data || [])];
  const newState = itemListReducer(state, action);
  const { data, selectedId } = newState;

  const lookupIdxs = getListIndicesLookupIdx(data, ['id', 'p_ctrl_acct_id']);
  newState.data = data.map((item) => {
    if (item.id === 1) {
      return {
        ...item,
        state: {
          isExpanded: true,
          hasChildren: true,
          isSelected: false
        }
      };
    }

    const oldItemIdx = oldLookupIdx[item.id];

    return {
      ...item,
      state: oldItemIdx
        ? {
          ...oldData[oldItemIdx].state,
          hasChildren: !!lookupIdxs.p_ctrl_acct_id[item.id],
          isExpanded: selectedId === item.id ? true : oldData[oldItemIdx].state.isExpanded
        }
        : {
          isExpanded: false,
          hasChildren: !!lookupIdxs.p_ctrl_acct_id[item.id],
          isSelected: false
        }
    };
  });

  newState.lookupIdx = lookupIdxs.id;

  return newState;
};

// Reducer used to handle expanding a controlling account
const expandReducer = (state, action) => {
  const { item, isExpanded } = action.payload;
  const { data, lookupIdx } = state;

  const index = lookupIdx[item.id];

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

// Reducer used to handle selecting a controlling account
const selectReducer = (state, action) => {
  const { item, isSelected } = action.payload;
  const { data, lookupIdx, selectedId } = state;
  const newData = [
    ...data
  ];

  const index = lookupIdx[item.id];

  if (selectedId !== false) {
    const oldSelectedItemIndex = lookupIdx[selectedId];
    const oldSelectedItem = data[oldSelectedItemIndex];
    const uptOldSelectedItem = {
      ...oldSelectedItem,
      state: {
        ...oldSelectedItem.state,
        isSelected: false
      }
    };

    newData[oldSelectedItemIndex] = uptOldSelectedItem;

    if (oldSelectedItemIndex === index) {
      return {
        ...state,
        data: newData,
        selectedId: isSelected ? uptOldSelectedItem.id : false
      };
    }
  }

  const newSelectedItem = {
    ...item,
    state: {
      ...item.state,
      isSelected
    }
  };

  newData[index] = newSelectedItem;

  return {
    ...state,
    data: newData,
    selectedId: isSelected ? newSelectedItem.id : false
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
    case actionTypes.EXPAND:
      return expandReducer(state, action);
    case actionTypes.SELECT:
      return selectReducer(state, action);
    default:
      return state;
  }
};
