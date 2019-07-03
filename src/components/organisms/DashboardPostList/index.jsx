import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import Grid from 'styles/Grid';

import DashboardPostItem from 'components/molecules/DashboardPostItem';
import Heading from 'components/atoms/Heading';

import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Grid: styled(Grid).attrs({
    columns: 9,
  })`
    row-gap: 8px;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      grid-column: 1 / -1;
    }
  `,
  Tools: styled.div`
    display: flex;
    padding: 16px 0;
  `,
  New: styled(PrimaryButton).attrs({
    as: Link,
    size: 'mini',
  })`
    margin-left: auto;
  `,
};

function DashboardPostList({ title, projectId, page }) {
  const [contentList, setContentList] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await API.post(projectId).getAll({ size: 15, page });
        setContentList(data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getFormData();
  }, [API, projectId, page]);

  return (
    <Styled.Grid>
      <Heading>{title}</Heading>
      <Styled.Tools>
        <Styled.New to="new">+ 새 포스트 등록</Styled.New>
      </Styled.Tools>
      {contentList.map(content => (
        <Link to={`${content.id}/edit`} key={content.id}>
          <DashboardPostItem {...content} />
        </Link>
      ))}
    </Styled.Grid>
  );
}

DashboardPostList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  page: PropTypes.number,
};

DashboardPostList.defaultProps = {
  page: 1,
};

export default DashboardPostList;
