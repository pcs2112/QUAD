import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';

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
    console.log(data);
    return (
      <Fragment>
        <PageHeader headerText="Controlling Accounts Visual" />
        <Segment>
          Here
        </Segment>
      </Fragment>
    );
  }
}

export default withMainLayout(connect(
  state => ({
    data: controllingAccountsReduxModule.selectors.getTableData(state)
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch())
  })
)(ControllingAccountsVisual));
