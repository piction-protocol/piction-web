import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import media from 'styles/media';
import { MainGrid } from 'styles/Grid';

const Styled = {
  Wrapper: styled.div`
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, .3);
  `,
  MainGrid: styled(MainGrid)`
    height: 100%;
  `,
  Modal: styled.aside.attrs({
    'aria-modal': 'true',
  })`
    display: flex;
    flex-flow: column;
    grid-column: 1 / -1;
    margin-top: auto;
    margin-bottom: auto;
    padding: 24px;
    background-color: var(--white);
    box-shadow: 0 4px 8px 0 var(--shadow-color);
    ${media.desktop`
      grid-column: 5 / 9;
    `}
  `,
};

function Modal({ close, children, ...props }) {
  const root = document.getElementById('external-root');
  const modalRef = useRef(null);

  const handleClose = (event) => {
    if (event.target === event.currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const targetElement = modalRef.current;
    targetElement.focus();
    disableBodyScroll(targetElement, {
      reserveScrollBarGap: true,
    });

    return () => {
      enableBodyScroll(targetElement);
    };
  }, []);

  return (
    createPortal((
      <Styled.Wrapper ref={modalRef} onClick={handleClose}>
        <Styled.MainGrid onClick={handleClose}>
          <Styled.Modal {...props}>
            {children}
          </Styled.Modal>
        </Styled.MainGrid>
      </Styled.Wrapper>
    ), root)
  );
}

Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;

const ModalBody = styled.div`
  margin-bottom: 24px;
  text-align: center;
`;

export {
  ModalBody,
};
