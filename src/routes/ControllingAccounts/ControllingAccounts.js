import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import controllingAccountsReduxModule from 'redux/modules/controllingAccounts';
import withMainLayout from 'components/WithMainLayout';
import PageHeader from 'components/PageHeader';

class ControllingAccounts extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
      balance: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      def_acct: PropTypes.number,
      id: PropTypes.number.isRequired,
      insert_dttm: PropTypes.string.isRequired,
      lst_mod_user: PropTypes.string.isRequired,
      m_dr_cr: PropTypes.number.isRequired,
      n_level: PropTypes.number,
      name: PropTypes.string.isRequired,
      note_id: PropTypes.number,
      p_ctrl_acct_id: PropTypes.number.isRequired,
      p_path: PropTypes.string.isRequired,
      r_unit_id: PropTypes.number.isRequired,
      r_user_id: PropTypes.number.isRequired,
      reserved: PropTypes.number,
      update_dttm: PropTypes.string.isRequired
    })),
    fetch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { fetch } = this.props;
    fetch();
  }

  render() {
    const { data } = this.props;
    if (data.length > 0) {
      console.log(data);
    }
    return (
      <Fragment>
        <PageHeader headerText="Controlling Accounts" />
      </Fragment>
    );
  }
}

export default withMainLayout(connect(
  state => ({
    data: controllingAccountsReduxModule.selectors.getTreeData(state)
  }),
  dispatch => ({
    fetch: () => dispatch(controllingAccountsReduxModule.actions.fetch())
  })
)(ControllingAccounts));
