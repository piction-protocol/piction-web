import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { ReactComponent as CloseIcon } from 'images/ic-close.svg';

const Styled = {
  Wrapper: styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255, .96);
  `,
  Button: styled.button`
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
  `,
};

function FullscreenPopup({ close, children, ...props }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const targetElement = menuRef.current;
    disableBodyScroll(targetElement);

    return () => {
      enableBodyScroll(targetElement);
    };
  }, []);

  return (
    <Styled.Wrapper ref={menuRef} {...props}>
      <Styled.Button onClick={close}>
        <CloseIcon />
      </Styled.Button>
      {children}
    </Styled.Wrapper>
  );
}

FullscreenPopup.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FullscreenPopup;
