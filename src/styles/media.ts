import { css, CSSObject, SimpleInterpolation } from 'styled-components/macro';

const breakpoint = 1024;

export const mediaQuery = {
  mobile: `(max-width: ${breakpoint - 1}px)`,
  desktop: `(min-width: ${breakpoint}px)`,
};

const media = {
  mobile: (first: CSSObject | TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => css`
    @media ${mediaQuery.mobile} {
      ${css(first, ...interpolations)}
    }
  `,
  desktop: (first: CSSObject | TemplateStringsArray, ...interpolations: SimpleInterpolation[]) => css`
    @media ${mediaQuery.desktop} {
      ${css(first, ...interpolations)}
    }
  `,
};

export { media as default };
