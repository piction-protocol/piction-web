import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import media from 'styles/media';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';

import ContentImage from 'components/atoms/ContentImage';

const Styled = {
  Item: styled.article`
    display: flex;
    flex-flow: column;
    background-color: var(--white);
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    padding: 16px 0;
  `,
  Title: styled.h3`
    margin-bottom: 4px;
    font-size: var(--font-size--small);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${media.desktop`
      margin-bottom: 8px;
      font-size: var(--font-size--base);
    `}
  `,
};

function ProjectCard({
  title, thumbnail, children, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <ContentImage
        ratio={500 / 500}
        image={thumbnail || dummyThumbnailImage}
      />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.Text>
    </Styled.Item>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  children: PropTypes.node,
};

ProjectCard.defaultProps = {
  thumbnail: null,
  children: null,
};

export default ProjectCard;
