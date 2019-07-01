import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { ReactComponent as CloseIcon } from 'images/ic-close.svg';

const slideIn = keyframes`
  0% {
    right: -70%;
    left: 100%;
  }
  100% {
    right: 0;
    left: 30%;
  }
`;

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, .3);
  `,
  Menu: styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 30%;
    background-color: var(--white);
    animation: 300ms ${slideIn} ease;
  `,
  Button: styled.button`
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
  `,
};

function Sidemenu({ close, children, ...props }) {
  const menuRef = useRef(null);

  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const targetElement = menuRef.current;
    disableBodyScroll(targetElement);

    return () => {
      enableBodyScroll(targetElement);
    };
  }, []);

  return (
    <Styled.Wrapper ref={menuRef} onClick={handleClose}>
      <Styled.Menu {...props}>
        <Styled.Button onClick={close}>
          <CloseIcon />
        </Styled.Button>
        {children}
      </Styled.Menu>
    </Styled.Wrapper>
  );
}

Sidemenu.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Sidemenu;
