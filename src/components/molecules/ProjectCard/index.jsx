import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import dummyThumbnailImage from 'images/img-dummy-500x500.jpg';
import dummyWideThumbnailImage from 'images/img-dummy-1440x450.jpg';

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
    margin-bottom: 8px;
    font-size: var(--font-size--small);
  `,
};

function ProjectCard({
  title, type, thumbnail, wideThumbnail, children, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <ContentImage
        ratio={
          type === 'wide'
            ? (1440 / 450)
            : (500 / 500)
        }
        image={
          type === 'wide'
            ? (wideThumbnail || dummyWideThumbnailImage)
            : (thumbnail || dummyThumbnailImage)
        }
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
  type: PropTypes.string,
  thumbnail: PropTypes.string,
  wideThumbnail: PropTypes.string,
  children: PropTypes.node,
};

ProjectCard.defaultProps = {
  type: 'normal',
  thumbnail: null,
  wideThumbnail: null,
  children: null,
};

export default ProjectCard;
export const WideProjectCard = props => <ProjectCard type="wide" {...props} />;
