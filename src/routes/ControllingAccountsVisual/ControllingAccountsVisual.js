import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';
import CenteredTree from './CenteredTree';

class ControllingAccountsVisual extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    fetch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { data, fetch } = this.props;
    if (data === false || data.length < 1) {
      fetch();
    }
  }

  render() {
    const { data } = this.props;
    return (
      <Fragment>
        <PageHeader headerText="Controlling Accounts Visual" />
        {data && data.length > 0 && (
          <CenteredTree
            data={data}
          />
        )}
      </Fragment>
    );
  }
}

export default withMainLayout(connect(
  state => ({
    data: controllingAccountsReduxModule.selectors.getHierarchyData(state)
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch())
  })
)(ControllingAccountsVisual));
