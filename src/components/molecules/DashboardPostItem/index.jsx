import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Grid from 'styles/Grid';

import dummyCoverImage from 'images/img-dummy-960x360.jpg';

const Styled = {
  Item: styled(Grid).attrs({
    columns: 9,
  })`
    border: 1px solid var(--gray--light);
    background-color: var(--white);
  `,
  Cover: styled.div`
    display: flex;
    grid-column: span 3;
    background-image: url(${({ image }) => image});
    background-size: cover;
    background-position: center;
    &::after {
      content: '';
      padding-top: ${360 / 960 * 100}%;
    }
  `,
  Text: styled.div`
    display: flex;
    flex-flow: row wrap;
    grid-column: span 6;
    align-items: center;
    justify-content: space-between;
  `,
  Title: styled.p`
    font-size: var(--font-size--base);
  `,
  CreatedAt: styled.p`
    margin-right: 20px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
    text-align: right;
  `,
};

function dateConverter(time) {
  const date = new Date(time);

  return [
    `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`,
    `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`,
  ];
}

function DashboardPostItem({
  title, cover, createdAt, ...props
}) {
  const createdDate = dateConverter(createdAt);
  return (
    <Styled.Item
      {...props}
    >
      <Styled.Cover
        image={cover || dummyCoverImage}
      />
      <Styled.Text>
        <Styled.Title>{title}</Styled.Title>
        <div>
          <Styled.CreatedAt>
            {createdDate[0]}
          </Styled.CreatedAt>
          <Styled.CreatedAt>
            {createdDate[1]}
          </Styled.CreatedAt>
        </div>
      </Styled.Text>
    </Styled.Item>
  );
}

DashboardPostItem.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
};

DashboardPostItem.defaultProps = {
  cover: dummyCoverImage,
};

export default DashboardPostItem;
