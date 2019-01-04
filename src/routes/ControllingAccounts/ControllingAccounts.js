import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Button } from 'semantic-ui-react';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';
import TreeView from './TreeView';

const treeContainerStyles = { height: '400px', position: 'relative' };

class ControllingAccounts extends Component {
  static propTypes = {
    nodes: PropTypes.array,
    fetch: PropTypes.func.isRequired,
    expand: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { nodes, fetch } = this.props;
    if (nodes === false || nodes.length < 1) {
      fetch();
    }
  }

  render() {
    const { nodes, expand, select } = this.props;
    return (
      <Fragment>
        <PageHeader headerText="Controlling Accounts" />
        <Segment>
          <div style={treeContainerStyles}>
            <TreeView
              nodes={nodes}
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
              >
                View Account
              </Button>
              <Button
                size="small"
              >
                Add Account
              </Button>
            </Grid.Column>
          </Grid>
        </Segment>
      </Fragment>
    );
  }
}

export default withMainLayout(connect(
  state => ({
    nodes: controllingAccountsReduxModule.selectors.getNodes(state)
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch()),
    expand: (nodes, node) => (
      dispatch(controllingAccountsReduxModule.actions.update(nodes, node))
    ),
    select: (nodes, node) => (
      dispatch(controllingAccountsReduxModule.actions.select(nodes, node))
    )
  })
)(ControllingAccounts));
