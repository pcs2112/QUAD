import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Header } from 'semantic-ui-react';
import { connectModal } from 'redux-modal';
import { reset } from 'redux-form';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withControllingAccountForm from '../WithControllingAccountForm';

const Form = withControllingAccountForm('create');

const CreateControllingAccountModal = ({
  name, initialValues, open, onClose, onSubmit, onSubmitSuccess
}) => (
  <Modal
    open={open}
    onClose={onClose}
    size="tiny"
    closeIcon
    dimmer="inverted"
    closeOnDimmerClick={false}
  >
    <Header content={<h1>CREATE CONTROLLING ACCOUNT</h1>} />
    <Modal.Content>
      <Form
        form={`${name}_FORM`}
        initialValues={initialValues}
        onSubmit={onSubmit}
        onSubmitSuccess={onSubmitSuccess}
        successMessage="The controlling account was created successfully."
      />
    </Modal.Content>
  </Modal>
);

CreateControllingAccountModal.propTypes = {
  name: PropTypes.string.isRequired,
  initialValues: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired
};

export default connectModal(
  CreateControllingAccountModal,
  'modal',
  state => ({
    initialValues: controllingAccountsReduxModule.selectors.getCreateInitialValues(state)
  }),
  (dispatch, ownProps) => ({
    onSubmit: data => dispatch(controllingAccountsReduxModule.actions.create(data)),
    onSubmitSuccess: (res) => {
      const { name } = ownProps;
      dispatch(reset(`${name}_FORM`));
      dispatch(controllingAccountsReduxModule.actions.addNode(res[0]));
    }
  })
);
