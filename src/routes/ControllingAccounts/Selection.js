import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const MAX_SELECT = 3;

const Selection = ({ node, children, onChange }) => {
  const { state: { selected } = {} } = node;
  const className = classNames({
    'check square outline icon': selected,
    'square outline icon': !selected,
  });

  return (
    <span>
      <i // eslint-disable-line
        role="button"
        className={className}
        onClick={() => (
          onChange({
            node: {
              ...node,
              state: {
                ...(node.state || {}),
                selected: !selected
              },
            },
            type: MAX_SELECT
          })
        )}
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
