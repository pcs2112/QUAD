import 'react-virtualized/styles.css';
import 'react-virtualized-tree/lib/main.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TreeContainer, { renderers } from 'react-virtualized-tree';
import Selection, { MAX_SELECT } from './Selection';

const { Expandable } = renderers;
const iconsClassNameMap = {
  expanded: 'angle down icon',
  collapsed: 'angle right icon',
  lastChild: ''
};

class TreeView extends Component {
  static propTypes = {
    nodes: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes
    };
  }

  handleChange = (nodes) => {
    this.setState({ nodes });
  };

  selectNodes = (nodes, selected) => (
    nodes.map(n => ({
      ...n,
      children: n.children ? this.selectNodes(n.children, selected) : [],
      state: {
        ...n.state,
        selected
      }
    }))
  );

  nodeSelectionHandler = (nodes, updatedNode) => (
    nodes.map((node) => {
      if (node.id === updatedNode.id) {
        return {
          ...updatedNode,
          children: node.children ? this.selectNodes(node.children, updatedNode.state.selected) : []
        };
      }

      if (node.children) {
        return {
          ...node,
          children: this.nodeSelectionHandler(node.children, updatedNode)
        };
      }

      return node;
    })
  );

  render() {
    const { nodes } = this.state;
    return (
      <TreeContainer
        nodes={nodes}
        onChange={this.handleChange}
        extensions={{
          updateTypeHandlers: {
            [MAX_SELECT]: this.nodeSelectionHandler
          },
        }}
      >
        {({ node, ...rest }) => (
          <Expandable node={node} iconsClassNameMap={iconsClassNameMap} {...rest}>
            <Selection node={node} {...rest}>
              {node.name}
            </Selection>
          </Expandable>
        )}
      </TreeContainer>
    );
  }
}

export default TreeView;
