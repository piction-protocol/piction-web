import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

const Input = styled.input.attrs(({ type }) => ({
  type,
}))`
  min-width: 0;
  padding: 14px;
  border: 2px solid var(--gray);
  background-color: var(--white);
  font-size: var(--font-size--small);
  line-height: normal;
  transition: box-shadow var(--transition--form), border-color var(--transition--form), background-color var(--transition--form);

  &:focus {
    border-color: var(--black);
    outline: none;
    box-shadow: 2px 4px 4px 0 var(--shadow-color);
  }

  &:disabled, &[readonly]{
    background-color: var(--gray--pale);
    color: var(--gray);
  }

  &::placeholder {
    color: var(--gray);
  }

  ${({ invalid }) => invalid && 'border-color: var(--red)'};
`;

export default Input;

Input.propTypes = {
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};
