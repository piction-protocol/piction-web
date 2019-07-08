import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
  title, wideThumbnail, children, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <ContentImage
        ratio={1440 / 450}
        image={wideThumbnail || dummyWideThumbnailImage}
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
  wideThumbnail: PropTypes.string,
  children: PropTypes.node,
};

ProjectCard.defaultProps = {
  wideThumbnail: null,
  children: null,
};

export default ProjectCard;
