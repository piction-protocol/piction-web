import { css } from 'styled-components';

const placeholder = style => css`
  ${props => props.placeholder && `
    color: var(--gray--light);
    background-color: var(--gray--light);
    ${style}
  `}
`;

export default placeholder;
