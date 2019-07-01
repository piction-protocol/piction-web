import { css } from 'styled-components';

const breakpoint = 1024;

export const mediaQuery = {
  mobile: `(max-width: ${breakpoint - 1}px)`,
  desktop: `(min-width: ${breakpoint}px)`,
};

const media = Object.keys(mediaQuery).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media ${mediaQuery[label]} {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export { media as default };
