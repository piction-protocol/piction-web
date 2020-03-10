import { css } from 'styled-components/macro';

const breakpoint = 1024;

export const mediaQuery = {
  mobile: `(max-width: ${breakpoint - 1}px)`,
  desktop: `(min-width: ${breakpoint}px)`,
};

const media = {
  mobile: (args: TemplateStringsArray) => css`
    @media ${mediaQuery.mobile} {
      ${css(args)}
    }
  `,
  desktop: (args: TemplateStringsArray) => css`
    @media ${mediaQuery.desktop} {
      ${css(args)}
    }
  `,
};

export { media as default };
