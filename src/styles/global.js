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

    --font-size--large: 30px;
    --font-size--base: 18px;
    --font-size--small: 14px;

    --line-height--base: normal;
    --line-height--contents: 1.72;

    --max-width: 1280px;
    --gap: 20px;
  }

  html, body {
    height: 100%;
  }

  #root {
    display: flex;
    flex-flow: column;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    font-size: var(--font-size--base);
    font-family: 'Noto Sans KR', sans-serif;
    line-height: var(--line-height--base);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
