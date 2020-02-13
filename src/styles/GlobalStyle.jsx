import 'normalize.css';
import { createGlobalStyle } from 'styled-components/macro';

import media from 'styles/media';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #000000;
    --charcoal-black: #333333;
    --gray--dark: #BFBFBF;
    --gray--light: #F2F2F2;
    --white: #FFFFFF;

    --blue: #1A92FF;
    --red: #D51315;

    --primary-color: var(--blue);

    --shadow-color: rgba(0, 0, 0, .15);

    --font-size--large: 30px;
    --font-size--big: 22px;
    --font-size--base: 18px;
    --font-size--small: 14px;
    --font-size--tiny: 12px;

    --poppins: 'Poppins', 'Noto Sans KR', sans-serif;

    --line-height--base: normal;
    --line-height--content: 1.75;

    --max-width: 1124px;

    --outer-gap: 16px;
    --column-gap: 8px;
    --row-gap: 24px;
    --row-gap--double: 48px;
    --grid-columns: 6;

    --transition--form: 200ms ease;
    ${media.desktop`
      --outer-gap: 24px;
      --column-gap: 16px;
      --grid-columns: 12;
    `}
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html, body {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    color: var(--charcoal-black);
    font-size: var(--font-size--base);
    font-family: 'Noto Sans KR', sans-serif;
    line-height: var(--line-height--base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    appearance: none;
    padding: 0;
    border: 0;
    background-color: transparent;
    line-height: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    font-size: inherit;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .root {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
  }

  .a11y {
    position: absolute;
    left: -5000px;
    top: auto;
    width: 1px;
    height: 1px;
    font-size: 1px;
    overflow: hidden;
    opacity: 0;
  }

  [tabindex="-1"][role="group"] {
    display: flex;
    flex: 1;
  }
`;

export default GlobalStyle;
