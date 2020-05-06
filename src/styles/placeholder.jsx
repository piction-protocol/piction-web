import { css } from 'styled-components/macro';

const placeholder = style => css`
  ${({ isPlaceholder }) => isPlaceholder && `
    color: var(--gray--pale);
    background-color: var(--gray--pale);
    ${style}
  `}
`;

export default placeholder;
