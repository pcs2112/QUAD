import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import authModule from 'redux/modules/auth';
import withGuestLayout from 'components/WithGuestLayout';
import LoginForm from './LoginForm';

class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLoginSuccess: PropTypes.func.isRequired
  };

  render() {
    const { onLogin, onLoginSuccess } = this.props;

    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          Log-in to the QUAD
        </Header>
        <Segment textAlign="left" color="grey">
          <LoginForm
            formSize="large"
            onSubmit={onLogin}
            onSubmitSuccess={onLoginSuccess}
          />
        </Segment>
      </Fragment>
    );
  }
}

export default withGuestLayout(connect(
  null,
  dispatch => ({
    onLogin: data => dispatch(authModule.actions.login(data)),
    onLoginSuccess: () => {
      dispatch(authModule.actions.fetchUser());
    }
  })
)(Login));
