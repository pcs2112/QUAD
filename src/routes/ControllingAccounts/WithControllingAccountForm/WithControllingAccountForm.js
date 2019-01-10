import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { withBasicForm, TextField, SelectField } from 'react-components/lib/components/semantic-ui-react';
import controllingAccountsOptions from 'constants/controllingAccounts';
import { validators } from './validators';

const withControllingAccountForm = (scenario) => {
  const WithControllingAccountForm = ({
    pristine, submitting
  }) => (
    <Fragment>
      <Field name="code" type="text" component={TextField} label="Code" required />
      <Field name="name" type="text" component={TextField} label="Name" required />
      <Field
        name="ctrl_acct_units"
        component={SelectField}
        label="Account Units"
        options={controllingAccountsOptions}
        required
      />
      <Field name="p_ctrl_acct_id" type="hidden" component="input" />
      <Field name="balance" type="text" component={TextField} label="Starting Balance" required />
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
      'n_level',
      'ctrl_acct_units'
    ]
  })(withBasicForm(WithControllingAccountForm));
};

export default withControllingAccountForm;
