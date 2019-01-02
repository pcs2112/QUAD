import { itemReducerFor, itemReducerForInitalState } from 'javascript-utils/lib/redux/reducers';
import {
  getAccessToken, getRefreshToken, setAccessToken, setRefreshToken
} from 'helpers/auth';
import { actionTypes } from './actions';

// Initial tokens
const initialAccessToken = getAccessToken();
const initialRefreshToken = getRefreshToken();

// Initial state
const initialState = Object.assign({
  isLoggedIn: false
}, itemReducerForInitalState);

if (initialAccessToken) {
  initialState.accessToken = initialAccessToken;
  initialState.refreshToken = initialRefreshToken;
}

/**
 * Create the item reducer
 */
const itemReducer = itemReducerFor(actionTypes);

/**
 * Reducer to handle the access tokens.
 * @param {Object} state
 * @param {String|Boolean} accessToken
 * @param {String|Boolean|undefined} refreshToken
 */
const setAccessTokensReducer = (state, accessToken, refreshToken = undefined) => {
  const newState = { ...state };
  if (accessToken) {
    newState.accessToken = accessToken;
    setAccessToken(accessToken);
  } else if (accessToken === false) {
    delete (newState.accessToken);
    setAccessToken(undefined);
  }

  if (refreshToken) {
    newState.refreshToken = refreshToken;
    setRefreshToken(refreshToken);
  } else if (refreshToken === false) {
    delete (newState.refreshToken);
    setRefreshToken(undefined);
  }

  return newState;
};

/**
 * Auth reducer.
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BEGIN:
      return itemReducer(state, action);
    case actionTypes.FETCH_SUCCESS: {
      const newState = itemReducer(state, action);
      newState.isLoggedIn = true;
      return newState;
    }
    case actionTypes.FETCH_FAIL: {
      const newState = itemReducer(state, action);
      newState.isLoggedIn = false;
      return {
        ...state,
        isFetching: true
      };
    }
    case actionTypes.LOGOUT: {
      setAccessTokensReducer(state, false, false);
      const newState = { ...initialState };
      delete (newState.accessToken);
      delete (newState.refreshToken);
      return newState;
    }
    case actionTypes.LOGIN_SUCCESS: {
      const newState = setAccessTokensReducer(state, action.response.access_token, action.response.refresh_token);
      return {
        ...newState,
        isFetching: false,
        isLoggedIn: true
      };
    }
    case actionTypes.SET_ACCESS_TOKENS:
      return setAccessTokensReducer(state, action.accessToken, action.refreshToken);
    case actionTypes.SET_ACCESS_TOKEN:
      return setAccessTokensReducer(state, action.accessToken);
    default:
      return state;
  }
};
