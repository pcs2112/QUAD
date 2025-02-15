import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { menuCss } from './css';
import logo from './logo.png';

const isActive = (currentPathName, pathName) => currentPathName === pathName;

class MainMenu extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
  };

  onLogout = (e) => {
    e.preventDefault();
    const { onLogout } = this.props;
    onLogout();
  };

  render() {
    const { location: { pathname } } = this.props;
    return (
      <Menu inverted fixed="left" vertical size="large" style={menuCss}>
        <div className="item">
          <Link to="/">
            <img src={logo} className="ui image" alt="QUAD" />
          </Link>
        </div>
        <Menu.Item as={Link} to="/ctrlaccts" active={isActive(pathname, '/ctrlaccts')}>
          Controlling Accounts
        </Menu.Item>
        <Menu.Item as={Link} to="/ctrlaccts/visual" active={isActive(pathname, '/ctrlaccts/visual')}>
          Controlling Accounts Visual
        </Menu.Item>
        <Menu.Item as={Link} to="/logout" onClick={this.onLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(MainMenu);
