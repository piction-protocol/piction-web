import { css } from 'styled-components';

const ContentStyle = css`
  @font-face {
      font-family: 'RIDIBatang';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  font-size: var(--font-size--base);
  line-height: var(--line-height--content);
  word-break: break-all;

  img {
    max-width: 100%;
    vertical-align: middle;
  }

  a {
    color: var(--blue);
    text-decoration: underline;
  }

  b {
    font-weight: bold;
  }

  i {
    font-style: italic;
  }

  u {
    text-decoration: underline;
  }

  .align-center {
    text-align: center;
  }

  .align-right {
    text-align: right;
  }

  .video {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`;

export default ContentStyle;
