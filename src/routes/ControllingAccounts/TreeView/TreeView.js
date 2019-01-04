import 'react-virtualized/styles.css';
import 'react-virtualized-tree/lib/main.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeContainer from 'react-virtualized-tree';
import ExpandableNode, { EXPAND } from '../ExpandableNode';
import SelectionNode, { SELECT } from '../SelectionNode';

class TreeView extends Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired,
    onExpand: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
  };

  noop = () => {};

  nodeExpandHandler = (nodes, updatedNode) => {
    const { onExpand } = this.props;
    onExpand(nodes, updatedNode);
  };

  nodeSelectionHandler = (nodes, updatedNode) => {
    const { onSelect } = this.props;
    onSelect(nodes, updatedNode);
  };

  render() {
    const { nodes } = this.props;
    return (
      <TreeContainer
        nodes={nodes}
        onChange={this.noop}
        extensions={{
          updateTypeHandlers: {
            [EXPAND]: this.nodeExpandHandler,
            [SELECT]: this.nodeSelectionHandler
          }
        }}
      >
        {({ node, ...rest }) => (
          <ExpandableNode node={node} {...rest}>
            <SelectionNode node={node} {...rest}>
              {node.name}
            </SelectionNode>
          </ExpandableNode>
        )}
      </TreeContainer>
    );
  }
}

export default TreeView;
