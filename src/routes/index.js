import ControllingAccounts from './ControllingAccounts';
import Error from './Error';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import Login from './Login';

export default () => ([
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/ctrlaccts',
    component: ControllingAccounts,
    exact: true
  },
  {
    path: '/forgot',
    component: ForgotPassword,
    exact: true
  },
  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    path: '*',
    component: Error
  }
]);
