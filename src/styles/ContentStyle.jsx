import { css } from 'styled-components';

const ContentStyle = css`
  font-size: var(--font-size--base);
  line-height: var(--line-height--contents);

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
`;

export default ContentStyle;
