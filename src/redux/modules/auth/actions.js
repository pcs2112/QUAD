import { catchValidation } from 'helpers/redux';

export const actionTypes = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
  FETCH_BEGIN: 'auth/FETCH_BEGIN',
  FETCH_SUCCESS: 'auth/FETCH_SUCCESS',
  FETCH_FAIL: 'auth/FETCH_FAIL',
  LOGIN_BEGIN: 'auth/LOGIN_BEGIN',
  LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
  LOGIN_FAIL: 'auth/LOGIN_FAIL',
  SET_ACCESS_TOKENS: 'auth/SET_ACCESS_TOKENS',
  SET_ACCESS_TOKEN: 'auth/SET_ACCESS_TOKEN',
  FORGOT_PASSWORD_BEGIN: 'auth/FORGOT_PASSWORD_BEGIN',
  FORGOT_PASSWORD_SUCCESS: 'auth/FORGOT_PASSWORD_SUCCESS',
  FORGOT_PASSWORD_FAIL: 'auth/FORGOT_PASSWORD_FAIL'
};

/**
 * Action to fetch the current user's information.
 */
export const fetchUser = () => ({
  types: [
    actionTypes.FETCH_BEGIN,
    actionTypes.FETCH_SUCCESS,
    actionTypes.FETCH_FAIL
  ],
  makeRequest: client => client.get('/api/auth/user')
});

/**
 * Action to login a user.
 *
 * @param {Object} data
 */
export const login = data => ({
  types: [
    actionTypes.LOGIN_BEGIN,
    actionTypes.LOGIN_SUCCESS,
    actionTypes.LOGIN_FAIL
  ],
  makeRequest: client => client.post('/api/auth/login', {
    data
  })
    .catch(catchValidation)
});

/**
 * Action to logout a user.
 */
export const logout = () => ({
  type: actionTypes.LOGOUT
});

/**
 * Action to set the user's access tokens.
 * @param {String} accessToken
 * @param {String} refreshToken
 */
export const setAccessTokens = (accessToken, refreshToken) => ({
  type: actionTypes.SET_ACCESS_TOKENS,
  accessToken,
  refreshToken
});

/**
 * Action to set the user's access token.
 * @param {String} accessToken
 */
export const setAccessToken = accessToken => ({
  type: actionTypes.SET_ACCESS_TOKEN,
  accessToken
});

/**
 * Action to handle the forgot password flow.
 *
 * @param {Object} data
 * @param {Number} scenario
 */
export const forgotPassword = (data, scenario) => ({
  types: [
    actionTypes.FORGOT_PASSWORD_BEGIN,
    actionTypes.FORGOT_PASSWORD_SUCCESS,
    actionTypes.FORGOT_PASSWORD_FAIL
  ],
  makeRequest: client => client.post('/api/auth/forgot', {
    data: {
      ...data,
      scenario
    }
  })
    .catch(catchValidation),
  payload: {
    scenario
  }
});
