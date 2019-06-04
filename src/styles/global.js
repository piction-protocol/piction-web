import 'normalize.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --black: #000000;
    --gray--dark: #BFBFBF;
    --gray--light: #F2F2F2;
    --white: #FFFFFF;

    --blue: #1A92FF;
    --red: #D51315;

    --primary-color: var(--blue);

    --shadow-color: rgba(0, 0, 0, .15);

    --font-size--large: 30px;
    --font-size--base: 18px;
    --font-size--small: 14px;

    --line-height--base: normal;
    --line-height--contents: 1.72;

    --max-width: 1280px;
    --gap: 20px;

    --transition--form: 200ms ease;
  }

  html, body {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    font-size: var(--font-size--base);
    font-family: 'Noto Sans KR', sans-serif;
    line-height: var(--line-height--base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .root {
    display: flex;
    flex-flow: column;
    height: 100%;
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
  }

  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
