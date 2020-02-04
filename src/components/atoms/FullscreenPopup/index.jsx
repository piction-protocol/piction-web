import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

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
};

function FullscreenPopup({ children, ...props }) {
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
      {children}
    </Styled.Wrapper>
  );
}

FullscreenPopup.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FullscreenPopup;
