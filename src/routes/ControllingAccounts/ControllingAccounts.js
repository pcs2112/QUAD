import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Button } from 'semantic-ui-react';
import { showModal } from 'redux-modal';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';
import TreeView from './TreeView';
import CreateControllingAccountModal from './CreateControllingAccountModal';

const treeContainerStyles = { height: '400px', position: 'relative' };
const CREATE_CONTROLLING_ACCOUNT_MODAL = 'CREATE_CONTROLLING_ACCOUNT_MODAL';

class ControllingAccounts extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    selectedNodesCount: PropTypes.number.isRequired,
    fetch: PropTypes.func.isRequired,
    expand: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    showCreateControllingAccountModal: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { data, fetch } = this.props;
    if (data === false || data.length < 1) {
      fetch();
    }
  }

  render() {
    const {
      data, selectedNodesCount, expand, select, showCreateControllingAccountModal
    } = this.props;
    return (
      <Fragment>
        <PageHeader headerText="Controlling Accounts" />
        <Segment>
          <div style={treeContainerStyles}>
            <TreeView
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
                disabled={selectedNodesCount < 1}
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
    data: controllingAccountsReduxModule.selectors.getData(state),
    selectedNodesCount: controllingAccountsReduxModule.selectors.getSelectedNodesCount(state)
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch()),
    expand: (nodes, node) => (
      dispatch(controllingAccountsReduxModule.actions.updateNode(nodes, node))
    ),
    select: (nodes, node) => (
      dispatch(controllingAccountsReduxModule.actions.selectNode(nodes, node))
    ),
    showCreateControllingAccountModal: () => dispatch(showModal(CREATE_CONTROLLING_ACCOUNT_MODAL))
  })
)(ControllingAccounts));
