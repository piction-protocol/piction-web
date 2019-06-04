import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  background-color: var(--white);
  box-shadow: 0 0 4px 0 var(--shadow-color);
  &::after {
    content: '';
    position: absolute;
    top: -5px;
    right: 16px;
    width: 11.3px;
    height: 11.3px;
    background-color: var(--white);
    box-shadow: -2px -2px 4px -1px var(--shadow-color);
    transform: rotate(45deg);
  }
`;

export default Dropdown;
