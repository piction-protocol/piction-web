import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

import Grid from 'styles/Grid';

import dummyCoverImage from 'images/img-dummy-960x360.jpg';

import ContentImage from 'components/atoms/ContentImage';

const Styled = {
  Item: styled(Grid).attrs({
    columns: 9,
    as: 'article',
  })`
    border: 1px solid var(--gray--light);
    background-color: var(--white);
    transition: box-shadow var(--transition--form);
    &:hover {
      box-shadow: 0 4px 8px var(--shadow-color);
    }
  `,
  Link: styled(Grid).attrs({
    columns: 7,
    as: 'a',
  })`
    grid-column: span 7;
  `,
  Cover: styled(ContentImage)`
    grid-column: span 3;
  `,
  Text: styled.div`
    display: flex;
    flex-flow: column;
    grid-column: span 4;
    justify-content: center;
  `,
  Title: styled.h2`
    margin-bottom: 4px;
    overflow: hidden;
    font-size: var(--font-size--base);
    font-weight: normal;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  CreatedAt: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Buttons: styled.div`
    grid-column: span 2;
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-right: 24px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Delete: styled.button.attrs({
    type: 'button',
  })`
    margin-left: 16px;
    color: var(--red);
    cursor: pointer;
  `,
};

function DashboardPostItem({
  id, projectId, title, cover, createdAt, handleDelete, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <Styled.Link target="_blank" href={`/project/${projectId}/posts/${id}`}>
        <Styled.Cover
          ratio={960 / 360}
          image={cover || dummyCoverImage}
        />
        <Styled.Text>
          <Styled.Title>
            {title}
          </Styled.Title>
          <Styled.CreatedAt>
            {moment(createdAt).format('YYYY.MM.DD HH:mm')}
          </Styled.CreatedAt>
        </Styled.Text>
      </Styled.Link>
      <Styled.Buttons>
        <Link to={`${id}/edit`}>
          수정
        </Link>
        <Styled.Delete onClick={handleDelete}>
          삭제
        </Styled.Delete>
      </Styled.Buttons>
    </Styled.Item>
  );
}

DashboardPostItem.propTypes = {
  id: PropTypes.number.isRequired,
  projectId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  createdAt: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

DashboardPostItem.defaultProps = {
  cover: dummyCoverImage,
};

export default DashboardPostItem;
