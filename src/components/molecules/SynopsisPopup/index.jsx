import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MainGrid } from 'styles/Grid';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';
import Heading from 'components/atoms/Heading';
import FullscreenPopup from 'components/atoms/FullscreenPopup';
import Tag from 'components/atoms/Tag';

import { ReactComponent as CloseIcon } from 'images/ic-close.svg';

const Styled = {
  Grid: styled(MainGrid).attrs({
    as: 'section',
  })`
    --row-gap: 8px;
    padding-top: 52px;
    text-align: center;
    > * {
      grid-column: 1 / -1;
    }
  `,
  Button: styled.button`
    display: flex;
    position: absolute;
    top: 16px;
    right: 16px;
  `,
  Thumbnail: styled(Thumbnail)`
    grid-column: 3 / 5;
    margin-bottom: 8px;
    border-radius: 50%;
  `,
  Heading: styled(Heading)`
    margin-bottom: 8px;
  `,
  Title: styled.p`
    margin-bottom: 8px;
    font-size: var(--font-size--small);
  `,
  Tags: styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  `,
  Tag: styled(Tag)`
    margin: 0 4px 8px;
  `,
  Synopsis: styled.p`
    width: 100%;
    padding-top: 16px;
    border-top: 1px solid var(--black);
    text-align: left;
    color: var(--black);
    font-size: var(--font-size--small);
    text-align: center;
  `,
};

function SynopsisPopup({
  close, thumbnail, title, user, synopsis, tags, ...props
}) {
  return (
    <FullscreenPopup {...props}>
      <Styled.Button onClick={close}>
        <CloseIcon />
      </Styled.Button>
      <Styled.Grid>
        <Styled.Thumbnail image={thumbnail} />
        <div>
          <Styled.Heading>{title}</Styled.Heading>
          <Styled.Title>{user.username}</Styled.Title>
        </div>
        <Styled.Tags>
          {tags.map(tag => <Styled.Tag key={tag}>{tag}</Styled.Tag>)}
        </Styled.Tags>
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
  user: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
  synopsis: PropTypes.string.isRequired,
};
