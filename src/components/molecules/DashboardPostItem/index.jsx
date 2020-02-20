import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';
import moment from 'moment';
import 'moment/locale/ko';

import { ReactComponent as LockedIcon } from 'images/ic-locked.svg';
import { ReactComponent as AccessTimeIcon } from 'images/ic-access-time.svg';

import Cover from 'components/atoms/ContentImage/Cover';

const Styled = {
  Item: styled.article`
    display: flex;
    flex-flow: row wrap;
    position: relative;
    border: 1px solid var(--gray--light);
    background-color: var(--white);
    transition: box-shadow var(--transition--form);
    &:hover {
      box-shadow: 0 4px 8px var(--shadow-color);
    }
  `,
  Labels: styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  `,
  Label: styled.span`
    display: flex;
    padding: 8px 12px;
    color: var(--white);
    svg {
      width: 20px;
      height: 20px;
      margin-right: 4px;
      path {
        fill: currentColor
      }
    }
  `,
  Link: styled.a`
    display: flex;
    flex: 1;
    flex-flow: row wrap;
  `,
  Cover: styled(Cover)`
    width: 111px;
    margin-right: 20px;
  `,
  Text: styled.div`
    display: flex;
    flex: 1;
    flex-flow: column;
    justify-content: center;
    overflow: hidden;
    margin-right: 16px;
  `,
  Series: styled.p`
    margin-bottom: 4px;
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Title: styled.h2`
    margin-bottom: 8px;
    overflow: hidden;
    font-size: var(--font-size--base);
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  CreatedAt: styled.p`
    color: var(--gray--dark);
    font-size: var(--font-size--small);
  `,
  Buttons: styled.div`
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
  id, projectId, title, cover, series, membership,
  createdAt, publishedAt, status, handleDelete, ...props
}) {
  return (
    <Styled.Item
      {...props}
    >
      <Styled.Link target="_blank" href={`/project/${projectId}/posts/${id}`}>
        <Styled.Labels>
          {publishedAt > Date.now() && (
            <Styled.Label style={{ backgroundColor: 'var(--blue)' }}>
              <AccessTimeIcon />
              예약
            </Styled.Label>
          )}
          {status === 'PRIVATE' && (
            <Styled.Label style={{ backgroundColor: 'var(--black)' }}>
              <LockedIcon />
              비공개
            </Styled.Label>
          )}
        </Styled.Labels>
        <Styled.Cover image={cover} />
        <Styled.Text>
          <Styled.Series>
            {series ? series.name : '미지정'}
            {membership && ` · ${membership.level > 0 ? `티어 ${membership.level}` : '구독자 공개'}`}
          </Styled.Series>
          <Styled.Title>
            {title}
          </Styled.Title>
          <Styled.CreatedAt>
            {moment(createdAt).format('YYYY/MM/DD HH:mm')}
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
  series: PropTypes.object,
  membership: PropTypes.object,
  createdAt: PropTypes.number.isRequired,
  publishedAt: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DashboardPostItem;
