import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import ContentImage from 'components/atoms/ContentImage';
import Heading from 'components/atoms/Heading';
import FullscreenPopup from 'components/atoms/FullscreenPopup';

const Styled = {
  Grid: styled(MainGrid).attrs({
    as: 'section',
  })`
    row-gap: 16px;
    padding-top: 52px;
    text-align: center;
    > * {
      grid-column: 1 / -1;
    }
  `,
  Thumbnail: styled(ContentImage)`
    grid-column: 3 / 5;
    border-radius: 50%;
  `,
  Title: styled.p`
    font-size: var(--font-size--small);
  `,
  Synopsis: styled.p`
    width: 100%;
    padding-top: 16px;
    border-top: 1px solid var(--black);
    text-align: left;
    color: var(--gray--dark);
    line-height: var(--line-height--content);
  `,
};

function SynopsisPopup({
  close, thumbnail, title, synopsis, ...props
}) {
  return (
    <FullscreenPopup close={close} {...props}>
      <Styled.Grid>
        <Styled.Thumbnail
          ratio={500 / 500}
          image={thumbnail}
        />
        <Heading>프로젝트 시놉시스</Heading>
        <Styled.Title>{title}</Styled.Title>
        <Styled.Synopsis>
          {synopsis}
        </Styled.Synopsis>
      </Styled.Grid>
    </FullscreenPopup>
  );
}

export default SynopsisPopup;

SynopsisPopup.propTypes = {
  close: PropTypes.func.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
};
