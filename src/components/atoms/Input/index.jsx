import styled from 'styled-components';

const Input = styled.input.attrs({
  type: 'text',
})`
  padding: 14px;
  border: 2px solid var(--gray--dark);
  background-color: var(--white);
  font-size: var(--font-size--small);
  line-height: normal;
  transition: box-shadow var(--transition--form), border-color var(--transition--form);

  &:focus {
    border-color: var(--black);
    outline: none;
    box-shadow: 2px 4px 4px 0 var(--shadow-color);
  }

  &::placeholder {
    color: var(--gray--dark);
  }
`;

export default Input;
