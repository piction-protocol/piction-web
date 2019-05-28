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
  }

  html {
    height: 100%;
  }

  body {
    display: flex;
    flex-flow: column;
    height: 100%;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
