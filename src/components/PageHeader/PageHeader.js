import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import { segmentCss, h1Css, h1ColorCss } from './css';

const PageHeader = ({ headerText, state }) => (
  <Segment css={segmentCss}>
    <h1 css={[h1Css, h1ColorCss(state)]}>
      {headerText}
    </h1>
  </Segment>
);

PageHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  state: PropTypes.string
};

export default PageHeader;
