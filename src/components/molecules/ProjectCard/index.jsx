import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';

import media from 'styles/media';

import Thumbnail from 'components/atoms/ContentImage/Thumbnail';

const Styled = {
  Item: styled.article`
    display: flex;
    position: relative;
    flex-flow: column;
    background-color: var(--white);
  `,
  Text: styled.div`
    display: flex;
    flex: 1;
    flex-flow: column;
    padding: 16px 0 0;
    ${media.desktop`
      padding: 16px 0;
    `}
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
    ${props => props.placeholder && `
      background-color: var(--gray--light);
      color: var(--gray--light);
    `};
  `,
  Labels: styled.div`
    position: absolute;
    top: 0;
    left: 0;
  `,
  UpdateLabel: styled.div`
    padding: 8px 12px;
    background-color: var(--black);
    color: var(--white);
    font-size: var(--font-size--small);
  `,
};

function ProjectCard({
  title, thumbnail, lastPublishedAt, children, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <Thumbnail image={thumbnail} />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        {children}
        <Styled.Labels>
          {moment().diff(lastPublishedAt, 'days') < 1 && (
            <Styled.UpdateLabel>
              UPDATE
            </Styled.UpdateLabel>
          )}
        </Styled.Labels>
      </Styled.Text>
    </Styled.Item>
  );
}

ProjectCard.Placeholder = () => (
  <Styled.Item>
    <Thumbnail />
    <Styled.Text>
      <Styled.Title placeholder>Project</Styled.Title>
    </Styled.Text>
  </Styled.Item>
);

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  lastPublishedAt: PropTypes.number,
  children: PropTypes.node,
};

export default ProjectCard;
