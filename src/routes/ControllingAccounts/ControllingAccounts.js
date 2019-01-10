import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Button } from 'semantic-ui-react';
import { showModal } from 'redux-modal';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';
import ControllingAccountsTable from './ControllingAccountsTable';
import CreateControllingAccountModal from './CreateControllingAccountModal';

const treeContainerStyles = { height: '400px', position: 'relative' };
const CREATE_CONTROLLING_ACCOUNT_MODAL = 'CREATE_CONTROLLING_ACCOUNT_MODAL';

class ControllingAccounts extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired,
    expand: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    showCreateControllingAccountModal: PropTypes.func.isRequired,
    addAccountEnabled: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { data, fetch } = this.props;
    if (data === false || data.length < 1) {
      fetch();
    }
  }

  render() {
    const {
      data, expand, select, showCreateControllingAccountModal, addAccountEnabled
    } = this.props;
    return (
      <Fragment>
        <PageHeader headerText="Controlling Account Management" />
        <Segment>
          <div style={treeContainerStyles}>
            <ControllingAccountsTable
              data={data}
              onExpand={expand}
              onSelect={select}
            />
          </div>
        </Segment>
        <Segment>
          <Grid>
            <Grid.Column width={16}>
              <Button
                size="small"
                disabled={addAccountEnabled === false}
                onClick={showCreateControllingAccountModal}
              >
                Add Account
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
        <CreateControllingAccountModal name={CREATE_CONTROLLING_ACCOUNT_MODAL} />
      </Fragment>
    );
  }
}

export default withMainLayout(connect(
  state => ({
    data: controllingAccountsReduxModule.selectors.getHierarchyData(state),
    addAccountEnabled: controllingAccountsReduxModule.selectors.getSelectedItemId(state) !== false
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch()),
    expand: (item, isExpanded) => dispatch(controllingAccountsReduxModule.actions.expand(item, isExpanded)),
    select: (i, item) => dispatch(controllingAccountsReduxModule.actions.select(i, item)),
    showCreateControllingAccountModal: () => dispatch(showModal(CREATE_CONTROLLING_ACCOUNT_MODAL))
  })
)(ControllingAccounts));
