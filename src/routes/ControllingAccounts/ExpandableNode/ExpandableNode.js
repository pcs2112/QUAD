import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';
import { getNodeRenderOptions, updateNode } from 'react-virtualized-tree/lib/selectors/nodes';
import { Renderer } from 'react-virtualized-tree/lib/shapes/rendererShapes';

export const EXPAND = 2;

const ExpandableNode = ({
  onChange,
  node,
  children,
  iconsClassNameMap = {
    expanded: 'angle down icon',
    collapsed: 'angle right icon',
    lastChild: '',
  },
}) => {
  const { hasChildren, isExpanded } = getNodeRenderOptions(node);
  const className = classNames({
    [iconsClassNameMap.expanded]: hasChildren && isExpanded,
    [iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
    [iconsClassNameMap.lastChild]: !hasChildren,
  });

  const handleChange = () => onChange(updateNode(node, { expanded: !isExpanded }));

  return (
    <span onDoubleClick={handleChange}>
      <i
        role="button"
        tabIndex={0}
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}
      />
      {children}
    </span>
  );
};

ExpandableNode.propTypes = {
  ...Renderer,
  iconsClassNameMap: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
    lastChild: PropTypes.string,
  }),
};

export default ExpandableNode;
