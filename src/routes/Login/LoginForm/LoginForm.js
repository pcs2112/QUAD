import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { Button, Divider } from 'semantic-ui-react';
import { withBasicForm, TextField } from 'react-components/lib/components/semantic-ui-react';
import { DEFAULT_FORM_ERROR } from 'constants/index';
import validate from './validate';

const LoginForm = ({
  pristine, submitting
}) => (
  <Fragment>
    <Field name="email" type="text" component={TextField} label="Email" required />
    <Field name="password" type="password" component={TextField} label="Password" required />
    <div className="field">
      <Button type="submit" fluid size="large" primary disabled={pristine || submitting}>
        Sign in
      </Button>
    </div>
    <Divider section />
    <p className="centered-aligned">
      <Link to="/forgot">
        Forgot password
      </Link>
    </p>
  </Fragment>
);

LoginForm.propTypes = {
  submitting: PropTypes.bool,
  pristine: PropTypes.bool
};

export default reduxForm({
  form: 'LoginForm',
  fields: ['email', 'password'],
  validate
})(withBasicForm(LoginForm, DEFAULT_FORM_ERROR));
