import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

import useAPI from 'hooks/useAPI';

import { ReactComponent as BadMoodIcon } from 'images/ic-mood-bad.svg';

import DashboardPostItem from 'components/molecules/DashboardPostItem';
import Heading from 'components/atoms/Heading';
import Select from 'components/atoms/Select';
import { PrimaryButton } from 'components/atoms/Button';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-flow: column;
    flex: 1;
    padding: 24px 0 48px;
    font-size: var(--font-size--small);
    > * {
      margin-bottom: var(--row-gap);
    }
  `,
  Tools: styled.div`
    display: flex;
  `,
  Select: styled(Select)`
    width: 190px;
  `,
  New: styled(PrimaryButton).attrs({
    as: Link,
    size: 'mini',
  })`
    margin-left: auto;
  `,
  List: styled.div`
    display: flex;
    flex-flow: column;
    > * {
      margin-bottom: 8px;
    }
  `,
  Empty: styled.div`
    margin: auto;
    color: var(--gray--dark);
    font-size: var(--font-size--base);
    text-align: center;
  `,
  BadMoodIcon: styled(BadMoodIcon)`
    width: 160px;
    height: 160px;
  `,
};

function DashboardPostList({ title, projectId, page }) {
  const [contentList, setContentList] = useState([]);
  const [API] = useCallback(useAPI(), []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        const { data } = await API.post(projectId).getAll({ params: { size: 15, page } });
        setContentList(data.content);
      } catch (error) {
        console.log(error);
      }
    };

    getFormData();
  }, [API, projectId, page]);

  return (
    <Styled.Container>
      <Heading>{title}</Heading>
      <Styled.Tools>
        <Styled.Select
          options={[
            { text: '모든 포스트', value: 'false' },
            { text: '멤버십 전용', value: 'true' },
          ]}
        />
        <Styled.New to="new">+ 새 포스트 등록</Styled.New>
      </Styled.Tools>
      {contentList.length === 0 && (
        <Styled.Empty>
          <Styled.BadMoodIcon />
          <p>
            등록된 포스트가 없습니다.
          </p>
        </Styled.Empty>
      )}
      <Styled.List>
        {contentList.map(content => (
          <Link to={`${content.id}/edit`} key={content.id}>
            <DashboardPostItem {...content} />
          </Link>
        ))}
      </Styled.List>
    </Styled.Container>
  );
}

DashboardPostList.propTypes = {
  title: PropTypes.string.isRequired,
  projectId: PropTypes.string.isRequired,
  page: PropTypes.string,
};

DashboardPostList.defaultProps = {
  page: '1',
};

export default DashboardPostList;
