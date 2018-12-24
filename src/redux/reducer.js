import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import user from './modules/user';

export default () => combineReducers({
  form,
  modal,
  user: user.reducer
});
