import styled from 'styled-components';

import CheckIcon from 'images/ic-check.svg';

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  appearance: none;
  position: relative;
  width: 16px;
  height: 16px;
  background-color: var(--white);
  background-image: url(${CheckIcon});
  background-size: cover;
  transition: background-color var(--transition--form);

  &:checked {
    background-color: var(--blue);
    &::after {
      border-color: var(--blue);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 2px solid var(--gray--dark);
    transition: border-color var(--transition--form);
  }
`;

export default Checkbox;
