import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { reducer as modal } from 'redux-modal';
import auth from './modules/auth';
import controllingAccounts from './modules/controllingAccounts';

export default () => combineReducers({
  form,
  modal,
  auth: auth.reducer,
  controllingAccounts: controllingAccounts.reducer
});
