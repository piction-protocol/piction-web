import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import WideThumbnail from 'components/atoms/ContentImage/WideThumbnail';

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

function WideProjectCard({
  title, wideThumbnail, children, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <WideThumbnail
        image={wideThumbnail}
      />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        {children}
      </Styled.Text>
    </Styled.Item>
  );
}

WideProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  wideThumbnail: PropTypes.string,
  children: PropTypes.node,
};

WideProjectCard.defaultProps = {
  wideThumbnail: null,
  children: null,
};

export default WideProjectCard;
