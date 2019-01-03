import { css } from '@emotion/core';
import { objectHasOwnProperty } from 'javascript-utils/lib/utils';
import { colors } from 'css/global';

export const segmentCss = css`
  background: ${colors.lighterSteelBlue};
`;

export const h1Css = css`
  text-align: center;
`;

export const h1ColorCss = (state) => {
  if (state && objectHasOwnProperty(colors, state)) {
    return css`
      color: ${colors[state]};
    `;
  }

  return '';
};
