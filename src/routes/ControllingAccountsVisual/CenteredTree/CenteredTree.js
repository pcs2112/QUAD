import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tree from 'react-d3-tree';

const containerStyles = {
  width: '100%',
  height: '100vh',
};

class CenteredTree extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired
  };

  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 100
      }
    });
  }

  render() {
    const { data } = this.props;
    const { translate } = this.state;
    return (
      <div
        style={containerStyles}
        ref={(tc) => {
          this.treeContainer = tc;
        }}
      >
        <Tree
          data={data}
          translate={translate}
          orientation="vertical"
        />
      </div>
    );
  }
}

export default CenteredTree;
