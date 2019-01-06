import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { withBasicForm, TextField } from 'react-components/lib/components/semantic-ui-react';
import { validators } from './validators';

const withControllingAccountForm = (scenario) => {
  const WithControllingAccountForm = ({
    pristine, submitting
  }) => (
    <Fragment>
      <Field name="code" type="text" component={TextField} label="Code" required />
      <Field name="name" type="text" component={TextField} label="Name" required />
      <Field name="p_ctrl_acct_id" type="hidden" component="input" />
      <Field name="n_level" type="hidden" component="input" />
      <div className="field">
        <Button type="submit" fluid size="large" primary disabled={pristine || submitting}>
          Submit
        </Button>
      </div>
    </Fragment>
  );

  WithControllingAccountForm.propTypes = {
    submitting: PropTypes.bool,
    pristine: PropTypes.bool
  };

  return reduxForm({
    validate: validators[scenario],
    fields: [
      'code',
      'name',
      'p_ctrl_acct_id',
      'n_level'
    ]
  })(withBasicForm(WithControllingAccountForm));
};

export default withControllingAccountForm;
