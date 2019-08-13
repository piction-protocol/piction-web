import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  position: relative;
  padding: 16px 20px;
  border: 0;
  font-size: var(--font-size--small);
  font-weight: bold;
  text-align: center;
  line-height: normal;
  cursor: pointer;
  transition: var(--transition--form);

  ${props => props.size === 'mini' && `
    padding: 8px 16px;
  `}

  &[disabled] {
    pointer-events: none;
    background-color: var(--gray--light);
    color: var(--gray--dark);
    &::after {
      border: 0;
    }
  }
`;

Button.propTypes = {
  size: PropTypes.oneOf(['normal', 'mini']),
};

Button.defaultProps = {
  size: 'normal',
};

export default Button;

export const PrimaryButton = styled(Button)`
  background-color: var(--black);
  color: var(--white);

  &:hover {
    opacity: .8;
  }
`;

export const SecondaryButton = styled(Button)`
  background-color: var(--white);
  color: var(--black);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 3px solid var(--black);
    transition: inherit;
  }

  &:hover {
    &::after {
      border-color: var(--gray--dark);
    }
  }
`;

export const TertiaryButton = styled(Button)`
  background-color: var(--white);
  color: var(--black);

  &:hover {
    box-shadow: 0 2px 4px 0 var(--shadow-color);
  }
`;
