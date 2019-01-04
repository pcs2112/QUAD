import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { submitEvent } from 'react-virtualized-tree/lib/eventWrappers';

export const SELECT = 3;

const Selection = ({ node, children, onChange }) => {
  const { state: { selected } = {} } = node;
  const className = classNames({
    'check square outline icon': selected,
    'square outline icon': !selected,
  });

  const handleChange = () => onChange({
    node: {
      ...node,
      state: {
        ...(node.state || {}),
        selected: !selected
      },
    },
    type: SELECT
  });

  return (
    <span>
      <i
        role="button"
        tabIndex={0}
        className={className}
        onClick={handleChange}
        onKeyDown={submitEvent(handleChange)}
      />
      {children}
    </span>
  );
};

Selection.propTypes = {
  node: PropTypes.object.isRequired,
  children: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Selection;
