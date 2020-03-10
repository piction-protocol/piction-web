import { css } from 'styled-components/macro';

interface PlaceholderableProps {
  isPlaceholder: boolean
}

const placeholder = (style: string) => css<PlaceholderableProps>`
  ${({ isPlaceholder }) => isPlaceholder && `
    color: var(--gray--light);
    background-color: var(--gray--light);
    ${style}
  `}
`;

export default placeholder;
