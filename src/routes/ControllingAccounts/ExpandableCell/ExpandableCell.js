import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { submitEvent } from 'javascript-utils/lib/eventWrappers';

const styles = {
  cursor: 'pointer'
};

const ExpandableCell = ({
  rowData,
  onChange,
  iconsClassNameMap = {
    expanded: 'minus square outline icon',
    collapsed: 'plus square outline icon',
    lastChild: 'plus square outline disabled icon'
  }
}) => {
  const { isExpanded, hasChildren } = rowData.state;
  const className = classNames({
    [iconsClassNameMap.expanded]: hasChildren && isExpanded,
    [iconsClassNameMap.collapsed]: hasChildren && !isExpanded,
    [iconsClassNameMap.lastChild]: !hasChildren
  });

  const handleChange = (event) => {
    event.stopPropagation();
    onChange(rowData, !isExpanded);
  };

  return (
    <span onDoubleClick={handleChange} style={styles}>
      <i
        role="button"
        tabIndex={0}
        onKeyDown={submitEvent(handleChange)}
        onClick={handleChange}
        className={className}
      />
    </span>
  );
};

ExpandableCell.propTypes = {
  rowData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  iconsClassNameMap: PropTypes.shape({
    expanded: PropTypes.string,
    collapsed: PropTypes.string,
    lastChild: PropTypes.string
  })
};

export default ExpandableCell;
